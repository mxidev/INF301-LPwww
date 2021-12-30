import { gql } from "apollo-boost";

export const SET_PRODUCTO = gql`
  mutation updateProd($id: ID! $descripcion: String!, $valor: Int, $stock: Int, $carro: Int){
    updateProd(id: $id ,input:{descripcion: $descripcion, valor: $valor, stock: $stock, carro: $carro}){
      id
      valor
      descripcion
    }
  }
`;