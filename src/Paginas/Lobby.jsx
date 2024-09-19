import React from "react";
import {ContenedorElementosLobby, DisplayLobby} from '../componentes/Displays'
import TituloPrincipal from "../componentes/TituloPagina";
import { Tarjeta, ContenedorTarjetasLobby } from "../componentes/Contenedores";

import { FaQuestion, FaUsers } from "react-icons/fa";
import { CiBacon } from "react-icons/ci";
import { MdOutlineInventory } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import { IoIosIceCream } from "react-icons/io";
import Footer from "../componentes/Footer";

function Lobby() {
    return(
       
            <DisplayLobby>
                <TituloPrincipal textoTitulo="Selecciona la aplicación" display='none' />
                <ContenedorElementosLobby>
                    
                    

                    <ContenedorTarjetasLobby>
                        
                        <Tarjeta nombrePagina='McAuditoria' linkPagina="McAuditoria" Icon = {MdOutlineInventory} />
                        <Tarjeta nombrePagina='Inventario Detallado' linkPagina="InventarioDetallado" Icon = {FaPenToSquare} /> 
                        <Tarjeta nombrePagina='Usuarios' linkPagina="McBreak" Icon = {FaUsers} />
                        <Tarjeta nombrePagina='Extras' linkPagina="Extras" Icon = {CiBacon} />
                        <Tarjeta nombrePagina='CDP`s' linkPagina="cdpGerentes" Icon = {IoIosIceCream} />
                        
                    </ContenedorTarjetasLobby>
                </ContenedorElementosLobby>

                <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS, La Pagina No Almacena Ningún Tipo De Dato.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  />
            </DisplayLobby>

        

    );
}

export default Lobby;