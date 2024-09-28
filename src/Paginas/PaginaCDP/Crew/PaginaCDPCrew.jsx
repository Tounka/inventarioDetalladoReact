
import { PaginaCDPCrewUx } from "./PaginaCDPCrewUx"
import TituloPrincipal from "../../../componentes/TituloPagina"
import Footer from "../../../componentes/Footer"


export const PaginaCDPCrew = () =>{
   
    return(
        <>
            <TituloPrincipal textoTitulo="CDP"  />
                <PaginaCDPCrewUx />
            <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  /> 
        </>
        
    )
}