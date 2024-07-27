import { PaginaExtrasUx } from "./PaginaExtrasUx"
import { DisplayGenerico } from "../../componentes/Displays"
import TituloPrincipal from "../../componentes/TituloPagina"

import Footer from "../../componentes/Footer"
import { listaEmpleados, useEmpleados } from "../ContextoGeneral"
import { useState, useEffect } from "react"

export const PaginaExtras = () =>{
  
    const {listaEmpleados} = useEmpleados();
    console.log(listaEmpleados);
    return(
        <>
        <TituloPrincipal textoTitulo="McBreaks" />
        <DisplayGenerico>
            

            <PaginaExtrasUx />

            
        </DisplayGenerico>
        <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS, Es Solo Un Formato Digital Creado Para Facilitar Los Inventarios Detallados en CDP, La Pagina No Almacena Ningún Tipo De Dato.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  />
        </>
    
    )
}