
import { PaginaCDPCrewUx } from "./PaginaCDPCrewUx"
import TituloPrincipal from "../../../componentes/TituloPagina"
import Footer from "../../../componentes/Footer"
import { DisplayGenerico } from "../../../componentes/Displays"
import styled from "styled-components"
import { useEmpleados } from "../../ContextoGeneral"

const ContenedorCdp = styled.div`
    display: grid;
    width: 600px;
    max-width: 90%;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    
`;

const CardCDP = styled.div`
    width: 100%;
    height: 160px;
    background-color: var(--RojoPrincipal);
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
`;


export const PaginaCDPCrew = () =>{
    const {cajas} = useEmpleados();
    

    const  cajasFiltradas = Object.entries(cajas).filter( caja => caja[1].cdp );

    console.log("cajasFiltradas");
    console.log(cajasFiltradas);
    return(
        <>
            <TituloPrincipal textoTitulo="Selecciona el CDP"  />
                <DisplayGenerico >
                    <ContenedorCdp>
                    {cajasFiltradas.map(
                        (caja) => (
                            <CardCDP key={caja[1].id}>{caja[1].nombre}</CardCDP>
                        )
                    )}
                        

                    </ContenedorCdp>
                </DisplayGenerico>
            <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  /> 
        </>
        
    )
}