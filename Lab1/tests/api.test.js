const request = require("supertest");
const app = require("../server"); //servidor express


describe('Testing API endpoints', () => {
    // Prueba para obtener todos los productos
    it('Debería devolver todos los productos', async () => {
        const query = `
            query {
                getProductos {
                    id
                    descripcion
                    valor
                }
            }
        `;
        const response = await request(app).post('/graphql').send({ query });
        expect(response.statusCode).toBe(200);
        expect(response.body.data.getProductos.length).toBeGreaterThan(0);
    });

    // Prueba para crear un nuevo producto
    it('Debería crear un nuevo producto', async () => {
        const mutation = `
            mutation {
                addProd(input: { descripcion: "Nuevo Sushi", valor: 1000, stock: 10, carro: 0 }) {
                    id
                    descripcion
                    valor
                }
            }
        `;
        const response = await request(app).post('/graphql').send({ query: mutation });
        expect(response.statusCode).toBe(200);
        expect(response.body.data.addProd.descripcion).toBe("Nuevo Sushi");
    });

    // Prueba para validar el stock insuficiente
    it('Debería fallar si el stock es insuficiente', async () => {
        const mutation = `
            mutation {
                addDet(input: { cantidad: 100, productoId: "1" }) {
                    id
                    cantidad
                }
            }
        `;
        const response = await request(app).post('/graphql').send({ query: mutation });
        expect(response.statusCode).toBe(400); // Esperamos un error de stock insuficiente
        expect(response.body.errors[0].message).toContain("Stock insuficiente");
    });
});

//Prueba de validación de stock
describe("Validación de stock al crear detalle de pedido", () => {
    it("Debe fallar si el stock es insuficiente", async () => {
        const query = `
            mutation {
                addDet(input: { cantidad: 100, productoId: "1" }) {
                    id
                    cantidad
                }
            }
        `;
        const response = await request(app).post("/graphql").send({ query });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].message).toBe("Stock insuficiente para el producto Oriental_Sakeebi");
    });
});

//Prueba de zona de entrega
describe("Validación de zona de entrega", () => {
    it("Debe rechazar pedidos fuera del radio permitido", async () => {
        const query = `
            mutation {
                validarZonaEntrega(direccion: "direccion_lejana") {
                    message
                }
            }
        `;
        const response = await request(app).post("/graphql").send({ query });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].message).toBe("La dirección está fuera del radio de entrega permitido (3 km).");
    });
});

//Prueba de anulación de pedidos
describe("Anulación de pedidos", () => {
    it("Debe fallar si el pedido ya está despachado", async () => {
        const query = `
            mutation {
                anularPedido(id: "1") {
                    message
                }
            }
        `;
        const response = await request(app).post("/graphql").send({ query });
        expect(response.statusCode).toBe(400);
        expect(response.body.errors[0].message).toBe("No se puede anular un pedido ya despachado.");
    });
});

//Prueba de validación de correos
describe("Validación de correos electrónicos", () => {
    it("Debe rechazar un correo no válido", async () => {
        const correo = "correo_invalido@test.com";
        const esValido = await validarCorreo(correo);
        expect(esValido).toBe(false);
    });
});
