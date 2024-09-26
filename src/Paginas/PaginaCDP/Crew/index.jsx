
import { PaginaCDPCrewUx } from "./PaginaCDPCrewUx"
import TituloPrincipal from "../../../componentes/TituloPagina"
import Footer from "../../../componentes/Footer"
import { DisplayGenerico } from "../../../componentes/Displays"
import styled from "styled-components"
import { useEmpleados } from "../../Contextos/ContextoGeneral"
import { useNavigate } from "react-router-dom"
import { useCdp } from "../../Contextos/ContextoCDP"

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
    border-radius: 20px;
    background-color: var(--RojoPrincipal);
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    @media (max-width: 600px){
        font-size: 36px;
        height: 140px;
    }
`;


export const SelectorCdp = () =>{
    const {cajas} = useEmpleados();
    const {setCDPSeleccionado} = useCdp();
    

    const  cajasFiltradas = Object.entries(cajas).filter( caja => caja[1].cdp );

    console.log("cajasFiltradas");
    console.log(cajasFiltradas);

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate("/CDPCrew");
        setCDPSeleccionado(id);
    } 
    return(
        <>
            <TituloPrincipal textoTitulo="Selecciona el CDP"  />
                <DisplayGenerico >
                    <ContenedorCdp>
                        {cajasFiltradas.map(
                            (caja) => (
                                <CardCDP key={caja[0]} onClick={() => handleClick(caja[0])} >{caja[1].nombre}  </CardCDP>
                            )
                        )}
                    </ContenedorCdp>
                </DisplayGenerico>
            <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  /> 
        </>
        
    )
}