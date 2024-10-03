
import { PaginaCDPCrewUx } from "./PaginaCDPCrewUx"
import TituloPrincipal from "../../../componentes/TituloPagina"
import Footer from "../../../componentes/Footer"
import { DisplayGenerico } from "../../../componentes/Displays"
import styled from "styled-components"
import { useEmpleados } from "../../Contextos/ContextoGeneral"
import { useNavigate } from "react-router-dom"
import { useCdp } from "../../Contextos/ContextoCDP"
import { useEffect, useState } from "react"
import { CardCaja } from "../../PaginaExtras/ComponentesExtras"
import { BtnStyled } from "../ComponentesGenerales/ComponentesGenericos"
import { ModalEmpleados } from "../../PaginaExtras/ModalSeleccionarEmpleado"


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
const ContenedorCardCaja = styled.div`
    
    width: 250px;

`
const ContenedorSeleccionarEmpleado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    flex-direction: column;
    gap: 10px;
`
const ContenedorHorizontal = styled.div`
    display: flex;
    gap: 20px;
`




export const SelectorCdp = () =>{
    const {cajas} = useEmpleados();
    const {setCDPSeleccionado, CDPSeleccionado} = useCdp();
    const [boolSeleccionarEmpleado, setBoolSeleccionarEmpleado] = useState(false);
    const [boolEmpleado, setBoolEmpleado] = useState();
    

    const  cajasFiltradas = Object.entries(cajas).filter( caja => caja[1].cdp );

    
    useEffect(() =>{
        
        if(cajas[CDPSeleccionado]?.empleado ){
            setBoolEmpleado(cajas[CDPSeleccionado]?.empleado)
        }else{
            setBoolEmpleado(false)
        }
        
    }, [CDPSeleccionado,cajas ]);
 

    const navigate = useNavigate();
    
    const handleClickEnviar = (accion) =>{
        if(accion === 1){
            navigate("/CDPCrew");
        }else if(accion === 2){
            setBoolSeleccionarEmpleado(false)
        }
        
    }
    const handleClick = (id) => {
       
        setBoolSeleccionarEmpleado(true);
        setCDPSeleccionado(id);
    } 
    return (
        <>
            <TituloPrincipal textoTitulo="Selecciona el CDP" />
            <DisplayGenerico>
                
                    {boolSeleccionarEmpleado ? (
                        <ContenedorSeleccionarEmpleado>
                            <ContenedorCardCaja>
                                <CardCaja numeroCaja={CDPSeleccionado} soloSeleccionar />
                            </ContenedorCardCaja>  
                            
                            <ContenedorHorizontal>
                                
                                <BtnStyled onClick={() => handleClickEnviar(2)}> Regresar </BtnStyled>
                                {boolEmpleado ? (
                                    <BtnStyled onClick={() => handleClickEnviar(1)}> Siguiente </BtnStyled> 
                                ) : null}
                                
                            </ContenedorHorizontal>
                       


                            <ModalEmpleados soloSeleccionar = {true} />
                        </ContenedorSeleccionarEmpleado>
                    ) : (
                        <ContenedorCdp>
                            {cajasFiltradas.map((caja) => (
                                <CardCDP key={caja[0]} onClick={() => handleClick(caja[0] )}>
                                    {caja[1].nombre}
                                </CardCDP>
                            ))}
                        </ContenedorCdp>
                    )}
                
            </DisplayGenerico>
            <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS.' textoSecundarioFooter='Desarrollado por Ramon Castillo' />
        </>
    );
    
}