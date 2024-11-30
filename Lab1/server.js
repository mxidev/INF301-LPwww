const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

let productos = require('./productos'); //poniendo "let" le damos la cualidad de que el esquema responda
//const productos = require('./productos');

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

    type Mutation {
        addProd(input: ProductoInput): Producto
        updateProd(id: ID!, input: ProductoInput): Producto
        deleteProd(id: ID!) : Alert
        addDet(input: DetalleInput): Detalle
        updateDet(id: ID!, input: DetalleInput): Detalle
        deleteDet(id: ID!) : Alert

        
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
    }
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


app.listen(8080, function () {
    console.log("Servidor Iniciado");
})