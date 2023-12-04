import logo from './logo.svg';
import './App.css';
import Item from './componentes/Item'
import { arregloProducto } from './js/objetos';

function App() {
  
  return (
    <div className="container-sm">
    {arregloProducto.map((producto, index) => (
        <Item key={index} objetoProducto= {producto} />
      ))}
    </div>
  );
}

export default App;
