const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const fs = require('fs');

let productos = require('./productos'); // Datos iniciales de productos
let pedidos = []; // Almacena pedidos
let usuarios = require('./usuarios'); // Almacena usuarios

const app = express();
app.use(cors());

// Definición del esquema GraphQL
const schema = buildSchema(`
  type Producto {
    id: ID!
    descripcion: String!
    valor: Int!
    stock: Int!
    foto: String
    carro: Int
  }

type Detalle {
    id: ID!
    cantidad: Int
  }

  type Pedido {
    id: ID!
    productos: [Producto]!
    total: Int!
    cliente: Usuario
    estado: String!
  }

  type Usuario {
    id: ID!
    nombre: String!
    correo: String!
    direccion: String!
    rol: String!
    message: String
  }

  type Alert {
    message: String
  }

  input ProductoInput {
    descripcion: String!
    valor: Int!
    stock: Int!
    carro: Int
  }

input DetalleInput {
    cantidad: Int!
    productoId: ID!
  }

  input PedidoInput {
    productos: [ID!]!
    clienteId: ID!
  }

  input UsuarioInput {
    nombre: String!
    correo: String!
    direccion: String!
    rol: String!
    password: String!
  }

  type Query {
    getProductos: [Producto]
    getPedidos: [Pedido]
    getUsuarios: [Usuario]
  }

  type Mutation {
    addProd(input: ProductoInput): Producto
    addDet(input: DetalleInput): Detalle
    updateProd(id: ID!, input: ProductoInput): Producto
    deleteProd(id: ID!): Alert

    crearPedido(input: PedidoInput): Pedido
    anularPedido(id: ID!, motivo: String!): Alert

    registrarUsuario(input: UsuarioInput): Usuario
  }
`);

// Resolvers
const root = {
  // Gestión de productos
  getProductos: () => productos,
  addProd: ({ input }) => {
    const id = String(productos.length + 1);
    const nuevoProducto = { id, ...input };
    productos.push(nuevoProducto);
    return nuevoProducto;
  },
  
  addDet: ({ input }) => {
    const { cantidad, productoId } = input;
  
    // Busca el producto
    const producto = productos.find((p) => p.id === productoId);
    if (!producto) {
      throw new Error(`Producto con ID ${productoId} no encontrado`);
    }
  
    // Verifica el stock
    if (producto.stock < cantidad) {
      throw new Error(`Stock insuficiente para el producto ${producto.descripcion}`);
    }
  
    // Reduce el stock
    producto.stock -= cantidad;
  
    // Crea un detalle de pedido (simulado)
    const detalle = { id: String(Math.random()), cantidad };
    return detalle;
  },
  
  updateProd: ({ id, input }) => {
    const index = productos.findIndex((prod) => prod.id === id);
    if (index === -1) throw new Error('Producto no encontrado');
    productos[index] = { ...productos[index], ...input };
    return productos[index];
  },
  deleteProd: ({ id }) => {
    productos = productos.filter((prod) => prod.id !== id);
    return { message: `Producto con id ${id} eliminado` };
  },

  // Gestión de pedidos
  crearPedido: ({ input }) => {
    const { productos: productosIds, clienteId } = input;
    const cliente = usuarios.find((u) => u.id === clienteId);
    if (!cliente) throw new Error('Cliente no encontrado');

    const productosPedido = productosIds.map((id) => {
      const producto = productos.find((p) => p.id === id);
      if (!producto || producto.stock <= 0) throw new Error(`Stock insuficiente para producto con id ${id}`);
      producto.stock -= 1; // Actualiza el stock
      return producto;
    });

    const total = productosPedido.reduce((acc, prod) => acc + prod.valor, 0);
    const nuevoPedido = { id: String(pedidos.length + 1), productos: productosPedido, total, cliente, estado: 'Pendiente' };
    pedidos.push(nuevoPedido);

    generarBoleta(nuevoPedido); // Genera boleta
    return nuevoPedido;
  },
  anularPedido: ({ id, motivo }) => {
    const pedido = pedidos.find((p) => p.id === id);
    if (!pedido) throw new Error('Pedido no encontrado');
    if (pedido.estado !== 'Pendiente') throw new Error('Solo se pueden anular pedidos pendientes');

    pedido.estado = 'Anulado';
    return { message: `Pedido ${id} anulado. Motivo: ${motivo}` };
  },

  // Gestión de usuarios


  registrarUsuario: ({ input }) => {
    const { password, nombre, correo } = input;

    try {
        // Validación de contraseña
        if (password.length < 8) {
            console.log(`Intento fallido de registro: Contraseña muy corta para ${correo}`);
            throw new Error('La contraseña debe tener al menos 8 caracteres.');
        }

        // Crear el nuevo usuario
        const id = String(usuarios.length + 1);
        const nuevoUsuario = { id, ...input };
        usuarios.push(nuevoUsuario);

        console.log(`Registro exitoso: Usuario ${nombre} (${correo}) creado correctamente.`);
        return nuevoUsuario;
    } catch (error) {
        console.error(`Error durante el registro de ${correo}: ${error.message}`);
        throw error;
    }
  },

  
  

  getUsuarios: () => {
    console.log("Usuarios actuales:", usuarios);
    return usuarios;
  },
  
  

  // Listar pedidos
  getPedidos: () => pedidos,
};

// Generar boleta en PDF
const generarBoleta = (pedido) => {
  const doc = new PDFDocument();
  const filename = `boleta_${pedido.id}.pdf`;

  doc.pipe(fs.createWriteStream(filename));
  doc.fontSize(16).text(`Boleta N°: ${pedido.id}`);
  doc.fontSize(12).text(`Cliente: ${pedido.cliente.nombre}`);
  doc.text('--- Productos ---');
  pedido.productos.forEach((p) => doc.text(`${p.descripcion} - $${p.valor}`));
  doc.text(`--- Total: $${pedido.total} ---`);
  doc.end();

  console.log(`Boleta generada: ${filename}`);
};

// Middleware de GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

// Solo inicia el servidor si no estás en modo test
if (process.env.NODE_ENV !== 'test') {
  app.listen(8080, () => {
    console.log('Servidor Iniciado en http://localhost:8080/graphql');
  });
}

module.exports = app;
