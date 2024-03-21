import './App.css';

import PaginaInventarioDetallado from './Paginas/PaginaInventarioDetallado'
import PaginaMcHoot from './Paginas/PaginaMcHoot';
import PaginaMcAuditoria from './Paginas/PaginaMcAuditoria';
import Lobby from './Paginas/Lobby';
import PaginaMcBreak from './Paginas/PaginaMcBreak';

import NotFound from './Paginas/NotFound'

import { BrowserRouter , Route, Routes} from 'react-router-dom';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='InventarioDetallado' element={<PaginaInventarioDetallado />} />
        <Route path='McHoot' element={<PaginaMcHoot />} />
        <Route path='McBreak' element={<PaginaMcBreak />} />
        <Route path='McAuditoria' element={<PaginaMcAuditoria />} />
        <Route index element={<Lobby />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>


      
    
    </>
    
  );
}

export default App;
