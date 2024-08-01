import React from "react";
import {ContenedorElementosLobby, DisplayLobby} from '../componentes/Displays'
import TituloPrincipal from "../componentes/TituloPagina";
import { Tarjeta, ContenedorTarjetasLobby } from "../componentes/Contenedores";

import Footer from "../componentes/Footer";

function Lobby() {
    return(
       
            <DisplayLobby>
                <TituloPrincipal textoTitulo="Selecciona la aplicación" />
                <ContenedorElementosLobby>
                    
                    

                    <ContenedorTarjetasLobby>
                        
                        <Tarjeta nombrePagina='McHoot' linkPagina="McHoot" />
                        <Tarjeta nombrePagina='Inventario Detallado' linkPagina="InventarioDetallado" />
                        <Tarjeta nombrePagina='McAuditoria' linkPagina="McAuditoria" />
                        <Tarjeta nombrePagina='McBreak' linkPagina="McBreak" />
                        <Tarjeta nombrePagina='Extras' linkPagina="Extras" />
                        
                    </ContenedorTarjetasLobby>
                </ContenedorElementosLobby>

                <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS, La Pagina No Almacena Ningún Tipo De Dato.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  />
            </DisplayLobby>

        

    );
}

export default Lobby;