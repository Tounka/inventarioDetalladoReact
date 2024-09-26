
import { DisplayGenerico } from "../../../componentes/Displays"
import { useEmpleados } from "../../Contextos/ContextoGeneral";

import styled from "styled-components"
import { CdpGerente } from "./Componentes";

const ContenedorPaginaCdp = styled(DisplayGenerico)`
    display: flex;
    flex-direction: row ;
    flex-wrap: wrap;
    gap: 20px; 
    padding: 20px;
    justify-content: center; 
`;


export const PaginaCDPGerenteUx = () =>{

    const {cajas} = useEmpleados();

    const  cajasFiltradas = Object.entries(cajas).filter( caja => caja[1].cdp );
   
    return(
        <ContenedorPaginaCdp>
            
            {cajasFiltradas.map((caja, cajaKey) => (
                
                <CdpGerente key={cajaKey} caja = {caja} />
            ))}
            
            
 
        
            
        </ContenedorPaginaCdp>
    )
}