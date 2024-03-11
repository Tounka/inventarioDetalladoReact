import React from "react";
import {DisplayPaginaBreaks} from '../componentes/Displays'
import { ContenedorPrimario } from "../componentes/Contenedores";
import TituloPrincipal from "../componentes/TituloPagina";
import Footer from "../componentes/Footer";
import {CardMcBreak} from '../componentes/ComponentesMcBreak'
import img from '../img/userRandom.jpg'
function PaginaMcBreak(){
    return(
        <DisplayPaginaBreaks>
            <TituloPrincipal textoTitulo="McBreaks" />
            <ContenedorPrimario> 
                
                <CardMcBreak SrcImg={img} Nombre='camila' />
            </ContenedorPrimario>
            <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  />
        </DisplayPaginaBreaks>
    )
}


export default PaginaMcBreak;