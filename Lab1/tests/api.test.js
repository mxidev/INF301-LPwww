const request = require('supertest');
const app = require('../server'); // Asegúrate de que apunta al archivo correcto
const validarCorreo = require('../utils/validarCorreo');

describe('Testing API endpoints', () => {
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

  it('Debe fallar si el stock es insuficiente', async () => {
    const mutation = `
      mutation {
        addDet(input: { cantidad: 100, productoId: "1"  }) {
          id
          cantidad
        }
      }
    `;
    const response = await request(app).post('/graphql').send({ query: mutation });
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toBe('Stock insuficiente para el producto Oriental_Sakeebi');
  });
});

describe('Validación de correos electrónicos', () => {
  it('Debe rechazar un correo no válido', async () => {
    const correo = 'correo_invalido@test';
    const esValido = await validarCorreo(correo);
    expect(esValido).toBe(false);
  });
});
