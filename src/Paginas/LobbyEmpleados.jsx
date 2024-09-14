import React from "react";
import {ContenedorElementosLobby, DisplayLobby} from '../componentes/Displays'
import TituloPrincipal from "../componentes/TituloPagina";
import { Tarjeta, ContenedorTarjetasLobby } from "../componentes/Contenedores";

import { FaQuestion } from "react-icons/fa";
import { BsFillTicketFill } from "react-icons/bs";
import { FaPenToSquare } from "react-icons/fa6";

import Footer from "../componentes/Footer";
import { useEmpleados } from "./Contextos/ContextoGeneral";

function LobbyEmpleados() {
    const {setPrivilegios} = useEmpleados();
    setPrivilegios('crew')
    return(
       
            <DisplayLobby>
                <TituloPrincipal textoTitulo="Selecciona la aplicación" display='none' />
                <ContenedorElementosLobby>
                    
                    

                    <ContenedorTarjetasLobby>
                        
                        <Tarjeta nombrePagina='McHoot' linkPagina="/McHoot" Icon = {FaQuestion}  />
                        <Tarjeta nombrePagina='Inventario Detallado' linkPagina="/InventarioDetallado" Icon = {FaPenToSquare} />
                        <Tarjeta nombrePagina='Tikets' linkPagina="/tickets" Icon = {BsFillTicketFill} />

                        
                    </ContenedorTarjetasLobby>
                </ContenedorElementosLobby>

                <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS, La Pagina No Almacena Ningún Tipo De Dato.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  />
            </DisplayLobby>

        

    );
}

export default LobbyEmpleados;