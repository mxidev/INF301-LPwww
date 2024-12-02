const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

let productos = require('./productos'); //poniendo "let" le damos la cualidad de que el esquema responda
//const productos = require('./productos');
let pedidos = []; // Almacena pedidos
let usuarios = require('./usuarios'); // Almacena usuarios

const app = express();

app.use(cors());
//firmas
const schema = buildSchema(`
    type Producto{
        id: ID!
        descripcion: String!
        valor: Int
        stock: Int
        foto: String
        carro: Int 
    }

    type Detalle{
        id: ID!
        cantidad: Int
    }

    type Alert{
        message: String
    }

    input ProductoInput{
        descripcion: String!
        valor: Int
        stock: Int
        carro: Int
    }

    input DetalleInput{
        cantidad: Int
    }

    type Usuario {
      id: ID!
      nombre: String!
      correo: String!
      direccion: String!
      rol: String!
      message: String
    }
    
    input UsuarioInput {
      nombre: String!
      correo: String!
      direccion: String!
      rol: String!
      password: String!
    }

    type Mutation {
        addProd(input: ProductoInput): Producto
        updateProd(id: ID!, input: ProductoInput): Producto
        deleteProd(id: ID!) : Alert
        addDet(input: DetalleInput): Detalle
        updateDet(id: ID!, input: DetalleInput): Detalle
        deleteDet(id: ID!) : Alert

        registrarUsuario(input: UsuarioInput): Usuario
        loginUsuario(correo: String!, password: String!): Usuario
        
    }

    type Query {
        getProductos: [Producto]
        getProducto(id: ID!): Producto
    }
`); // Plantillas
//addCurso(input: CursoInput): Curso 
//addCurso(titulo: String!, visitas: Int)
//updateCurso(id: ID!, input: CursoInput): Curso
//deleteCurso(id: ID!) : Alert

const root = { //aquí va todo el código relacionado a la conexión con la base de datos
    getProductos() {
        return productos;
    },
    getProducto({ id }) {
        console.log(id); //solo para que se muestre por consola que va cogiendo
        return productos.find((producto) => id == producto.id); //busca el objeto comparando el valor actual dado (id) con el curso.id del objeto con el que compara actualmente
    },
    addProd({ input }) {
        const { descripcion, valor, stock } = input;
        const id = String(productos.length + 1);
        const producto = { id, descripcion, valor, stock };
        productos.push(producto);
        return producto;
    },
    //addCurso( { input } ){
    updateProd({ id, input }) {
        const { descripcion, valor, stock, carro } = input;
        const indice = productos.findIndex((producto) => id === producto.id); //== está buscando la coincidencia de los contenidos (0 = false), pero con ==, requiere que coincida tanto tipo como contenido (0 != false) 
        const producto = productos[indice];

        const nuevoProducto = Object.assign(producto, { descripcion, valor, stock, carro });
        productos[indice] = nuevoProducto; //OJO QUIZÁS ESTÁ MAL

        return nuevoProducto;
    },
    //updateCurso( { id, input } )
    deleteProd({ id }) {
        productos = productos.filter((producto) => producto.id != id);
        return {
            message: `El producto con id ${id} fue eliminado`
        }
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

    loginUsuario: ({ correo, password }) => {
      const usuario = usuarios.find((u) => u.correo === correo);

      if (!usuario) {
        console.error(`Error: Usuario con correo ${correo} no encontrado.`);
        throw new Error('Usuario no encontrado.');
      }

      if (usuario.password !== password) {
        console.error(`Error: Contraseña incorrecta para el usuario ${correo}.`);
        throw new Error('Credenciales incorrectas.');
      }

      console.log(`Usuario ${usuario.nombre} autenticado correctamente.`);
      return usuario; // Devuelve la información del usuario
    },

    getUsuarios: () => {
      console.log("Usuarios actuales:", usuarios);
      return usuarios;
    },
}


app.get('/', function (req, res) {
    //res.send("Bienvenido");
    res.json(productos);
})

// middleware
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))


// Solo inicia el servidor si no estás en modo test
if (process.env.NODE_ENV !== 'test') {
  app.listen(8080, () => {
    console.log('Servidor Iniciado en http://localhost:8080/graphql');
  });
}