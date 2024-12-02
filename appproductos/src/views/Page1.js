import '../views/assets/styles/Page1.css';
import {GET_PRODUCTOS} from '../graphql/Queries';
import { SET_PRODUCTO } from '../graphql/Mutations';
import {useQuery} from '@apollo/client';
import {useMutation} from '@apollo/client';
import { Container} from 'react-bootstrap';
import { MDBContainer } from 'mdbreact';



function Page1() {
  const { loading, error, data } = useQuery(GET_PRODUCTOS);
  //loading ? console.log("loading") : console.log(data);
  const load = loading && <p>Loading</p>
  const[addProd, { dato, cargando, fallo }]  = useMutation(SET_PRODUCTO);
  const carro1 = 0;
  const carro2 = 0;
  const carro3 = 0;

  const pulsar = (aidi, nombre, precio, actual)=>{
    //if (aidi == 1 && carro1 == 0){carro1 = actual}
    //if (aidi == 2 && carro2 == 0){carro2 = actual}
    //if (aidi == 3 && carro3 == 0){carro3 = actual}
    console.log('Me has pulsado');
    console.log(aidi);
    addProd({variables: {id: aidi, descripcion: nombre, valor: precio, stock: 200, carro:  1 + actual}})
    //if (aidi == 1){carro1 = 1 + carro1}
    //if (aidi == 2){carro2 = 1 + carro2}
    //if (aidi == 3){carro3 = 1 + carro3}
    window.location.reload();
    
  }

  return (
    <div>
      <Container>
        <MDBContainer>
          <h1 style={{  color: '#ff4411' , 'text-align': "center", 'padding':'20px' }}>Catálogo de Productos</h1>
        </MDBContainer>
      <div class="products" style={{'padding-bottom':'100px'}}>
        {load}
        {data &&
          data.getProductos.map((getProductos) => {
             
              return <div class="product-card" style={{ 'padding':'10px','border':'2px solid red'}}>
                
                
                <div class="product-image" style={{'height':'auto','width':'auto', 'padding':'10px'}}>
                  <img class="foto" src={getProductos.foto} />
                </div>
                <div class="product-info" style= {{'padding-top':'12rem'}}>
                  <p key={getProductos.id}>{getProductos.descripcion} </p>
                  <p> Precio: {getProductos.valor}</p>
                  <button type="button" valor="1" onClick={()=>{pulsar (getProductos.id, getProductos.descripcion, getProductos.valor, getProductos.carro)}} >Agregar al carro</button>
                
                </div>
               
                
                </div>

               ;
              
        } )}
      </div>

        </Container>
    </div>
  );
  
}

export default Page1;
