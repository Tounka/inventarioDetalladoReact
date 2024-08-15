import './App.css';

import PaginaInventarioDetallado from './Paginas/PaginaInventarioDetallado'
import PaginaMcHoot from './Paginas/PaginaMcHoot';
import PaginaMcAuditoria from './Paginas/PaginaMcAuditoria';
import Lobby from './Paginas/Lobby';
import PaginaMcBreak from './Paginas/PaginaMcBreak';
import { PaginaExtras } from './Paginas/PaginaExtras';
import { PaginaTicketsExtras } from './Paginas/PaginaTicketsExtras';
import { PaginaGraficasAdmin } from './Paginas/PaginaGraficasAdmin';
import NotFound from './Paginas/NotFound'

import { BrowserRouter , Route, Routes} from 'react-router-dom';
import { EmpleadosProvider } from './Paginas/ContextoGeneral';


function App() {

  return (
    <EmpleadosProvider>
    <BrowserRouter>
      <Routes>
        <Route path='InventarioDetallado' element={<PaginaInventarioDetallado />} />
        <Route path='McHoot' element={<PaginaMcHoot />} />
        <Route path='McBreak' element={<PaginaMcBreak />} />
        <Route path='McAuditoria' element={<PaginaMcAuditoria />} />
        <Route path='Extras' element={<PaginaExtras />} />
        <Route path='Tickets' element={<PaginaTicketsExtras />} />
        <Route path='AdminGraficas' element={<PaginaGraficasAdmin />} />
        
        <Route index element={<Lobby />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>


      
    
    </EmpleadosProvider>
    
  );
}

export default App;
