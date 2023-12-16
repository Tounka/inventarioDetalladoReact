import './App.css';
import Footer from './componentes/Footer'
import PaginaInventarioDetallado from './Paginas/PaginaInventarioDetallado'
import PaginaMcHoot from './Paginas/PaginaMcHoot';
import NotFound from './Paginas/NotFound'

import { BrowserRouter , Route, Routes} from 'react-router-dom';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='InventarioDetallado' element={<PaginaInventarioDetallado />} />
        <Route path='McHoot' element={<PaginaMcHoot />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>


      <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS, Es Solo Un Formato Digital Creado Para Facilitar Los Inventarios Detallados en CDP, La Pagina No Almacena Ningún Tipo De Dato.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  /> 
    
    </>
    
  );
}

export default App;
