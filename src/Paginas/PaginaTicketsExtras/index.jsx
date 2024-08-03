import { PaginaTicketsExtrasUx } from "./TicketsExtrasUx"
import { DisplayGenerico } from "../../componentes/Displays"
import TituloPrincipal from "../../componentes/TituloPagina"
import Footer from "../../componentes/Footer"

export const PaginaTicketsExtras = () =>{
 
    return(
        <>
        <TituloPrincipal textoTitulo="Tickets" />
        <DisplayGenerico>
            

            <PaginaTicketsExtrasUx />

           
        </DisplayGenerico>
        <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS, Es Solo Un Formato Digital Creado Para Facilitar Los Inventarios Detallados en CDP, La Pagina No Almacena Ningún Tipo De Dato.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  />
        </>
    
    )
}