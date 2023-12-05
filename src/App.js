import logo from './logo.svg';
import './App.css';
import Item from './componentes/Item'
import Separador from './componentes/Separador'
import BtnImprimir from './componentes/BtnFlotante'
import InputID from './componentes/InputID'
import {  arregloProducto,
  arregloContenedoresProducto,
  arregloDesechablesProducto,
  arregloOperacional } from './js/objetos';

function App() {
  
  return (
    <div className="container-sm">
      <InputID />

      <Separador titulo="Contenedores" />

      {arregloContenedoresProducto.map((producto, index) => (
          <Item key={index} objetoProducto= {producto} />
        ))}
      <Separador titulo="Producto" />
      
      {arregloProducto.map((producto, index) => (
          <Item key={index} objetoProducto= {producto} />
        ))}
      <Separador titulo="Desechables" />
      
      {arregloDesechablesProducto.map((producto, index) => (
          <Item key={index} objetoProducto= {producto} />
        ))}
      <Separador titulo="Operacionales" />
      
      {arregloOperacional.map((producto, index) => (
          <Item key={index} objetoProducto= {producto} />
      ))}

        <BtnImprimir nombre='Hector Castillo' cdp='Renacimiento'/>
    </div>
  );
}

export default App;
