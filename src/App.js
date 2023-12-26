import './App.css';

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


      
    
    </>
    
  );
}

export default App;
