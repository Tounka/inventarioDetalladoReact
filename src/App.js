import logo from './logo.svg';
import './App.css';
import Item from './componentes/Item'
import Separador from './componentes/Separador'

import {  arregloProducto,
  arregloContenedoresProducto,
  arregloDesechablesProducto,
  arregloOperacional } from './js/objetos';

function App() {
  
  return (
    <div className="container-sm">
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
    </div>
  );
}

export default App;
