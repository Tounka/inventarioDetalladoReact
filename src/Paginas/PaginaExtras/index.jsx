import { PaginaExtrasUx } from "./PaginaExtrasUx"
import { DisplayGenerico } from "../../componentes/Displays"
import TituloPrincipal from "../../componentes/TituloPagina"
import { ModalEmpleados } from "./ModalSeleccionarEmpleado"
import Footer from "../../componentes/Footer"

export const PaginaExtras = () =>{
  

 
    return(
        <>
        
        <TituloPrincipal textoTitulo="Extras" />
        <DisplayGenerico>
            

            <PaginaExtrasUx />

            <ModalEmpleados />
        </DisplayGenerico>
        <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  />
        </>
    
    )
}