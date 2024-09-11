
import { PaginaCDPCrewUx, PaginaCDPGerenteUx } from "./PaginaCDPGerentesUx"
import TituloPrincipal from "../../../componentes/TituloPagina"
import Footer from "../../../componentes/Footer"
import { DisplayGenerico } from "../../../componentes/Displays"
import styled from "styled-components"
import { useEmpleados } from "../../ContextoGeneral"
import { useNavigate } from "react-router-dom"

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
    font-size: 42px;
    background-color: var(--RojoPrincipal);
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
`;


export const VisualizadorCDPs = () =>{
    const {cajas, setCDPSeleccionado} = useEmpleados();
    

    return(
        <>
            <TituloPrincipal textoTitulo="CDPs"  />
                <PaginaCDPGerenteUx />
            <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  /> 
        </>
        
    )
}