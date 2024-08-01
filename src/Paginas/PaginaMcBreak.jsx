import React from "react";
import {DisplayPaginaBreaks} from '../componentes/Displays'
import { ContenedorPrimario } from "../componentes/Contenedores";
import TituloPrincipal from "../componentes/TituloPagina";
import Footer from "../componentes/Footer";
import {CardMcBreak, CardAgregar} from '../componentes/ComponentesMcBreak'

import { useEmpleados } from "./ContextoGeneral";

function PaginaMcBreak(){

    const {listaEmpleados} = useEmpleados();
    
    return(
        <DisplayPaginaBreaks>
            <TituloPrincipal textoTitulo="McBreaks" />
            <ContenedorPrimario> 
                <CardAgregar ></CardAgregar>
                {listaEmpleados.map((empleado) => (
                    <CardMcBreak  SrcImg={empleado.img} Nombre={empleado.nombre} Apodo={empleado.apodo} ColorDeBg={empleado.bgColor} />
                ))
                    
                }
                
            </ContenedorPrimario>
            <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  />
        </DisplayPaginaBreaks>
    )
}


export default PaginaMcBreak;