
import { PaginaCDPCrewUx } from "./PaginaCDPCrewUx"
import TituloPrincipal from "../../../componentes/TituloPagina"
import Footer from "../../../componentes/Footer"
import { useEmpleados } from "../../ContextoGeneral"

export const PaginaCDPCrew = () =>{
    const {cajas} = useEmpleados();
    console.log( 'test');
    return(
        <>
            <TituloPrincipal textoTitulo="Seleccion CDP"  />
                
            <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  /> 
        </>
        
    )
}