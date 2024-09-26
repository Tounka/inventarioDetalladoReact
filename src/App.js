import './App.css';

import PaginaInventarioDetallado from './Paginas/PaginaInventarioDetallado'
import PaginaMcHoot from './Paginas/PaginaMcHoot';
import PaginaMcAuditoria from './Paginas/PaginaMcAuditoria';
import Lobby from './Paginas/Lobby';
import PaginaMcBreak from './Paginas/PaginaMcBreak';
import { PaginaExtras } from './Paginas/PaginaExtras';
import { PaginaTicketsExtras } from './Paginas/PaginaTicketsExtras';
import { PaginaGraficasAdmin } from './Paginas/PaginaGraficasAdmin';
import { PaginaCDPCrew } from './Paginas/PaginaCDP/Crew/PaginaCDPCrew';
import { VisualizadorCDPs } from './Paginas/PaginaCDP/Gerentes';
import { SelectorCdp } from './Paginas/PaginaCDP/Crew';
import LobbyEmpleados from './Paginas/LobbyEmpleados';
import NotFound from './Paginas/NotFound'

import { BrowserRouter , Route, Routes} from 'react-router-dom';
import { EmpleadosProvider } from './Paginas/Contextos/ContextoGeneral';
import { ModalAgregarToDo } from './Paginas/PaginaCDP/Gerentes/ModalAgregarToDo';
import { CdpProvider } from './Paginas/Contextos/ContextoCDP';
import { ModalAgregarTicket } from './Paginas/PaginaCDP/Crew/ModalEnviarTickets';



function App() {

  return (
    
      <EmpleadosProvider>
        <CdpProvider>
      <BrowserRouter>
        <Routes>
          <Route path='InventarioDetallado' element={<PaginaInventarioDetallado />} />
          <Route path='McHoot' element={<PaginaMcHoot />} />
          <Route path='McBreak' element={<PaginaMcBreak />} />
          <Route path='McAuditoria' element={<PaginaMcAuditoria />} />
          <Route path='Extras' element={<PaginaExtras />} />
          <Route path='Tickets' element={<PaginaTicketsExtras />} />
          <Route path='AdminGraficas' element={<PaginaGraficasAdmin />} />


      
          <Route path='SeleccionaTuCDP' element={<SelectorCdp />} />
          <Route path='CDPCrew' element={<PaginaCDPCrew />} />
          <Route path='CDPGerentes' element={<VisualizadorCDPs />} />
          


          <Route index element={<Lobby />} />
          <Route path='LobbyCrew'   element={<LobbyEmpleados />} />

          <Route path='*' element={<NotFound />} />
          
        </Routes>
      </BrowserRouter>

      <ModalAgregarToDo  />
      <ModalAgregarTicket  />
        
      </CdpProvider>  
      </EmpleadosProvider>
    
    
  );
}

export default App;
