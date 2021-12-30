import { gql } from "apollo-boost";

export const GET_PRODUCTOS = gql`
query{
    getProductos{
    id
    valor
    descripcion
    foto
    carro
    }
}
`;