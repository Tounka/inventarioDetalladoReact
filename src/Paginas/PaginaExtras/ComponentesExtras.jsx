import styled from "styled-components"
import { useEmpleados } from "../ContextoGeneral"
import { useState } from "react"
import { ImgPicture } from "../../componentes/ImgPicture"
const CardCajaStyled = styled.div`
    
    width: 100%;
    height: auto;
    display: grid;
    grid-template-rows: 50px 250px 40px;
    cursor: pointer;

`
const TxtCardCajas = styled.div`
    background-color: var(--RojoPrincipal);
    height: 100%;
    
    width:100%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
` 

const ContenedorCaja = styled.div`
    height: 100%;
    width:100%;
    font-size: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
` 
const ContenedorImgPicture = styled.div`
    width: 100%;
    position: relative;
    overflow: hidden;
`
export const CardCaja = ({nombre = 'Selecciona Empleado', numeroCaja = '1', empleado = '1'}) =>{
    const {setModalExtras, setCajaSeleccionada, cajas} = useEmpleados();
    
    const handleClick = () =>{
        setModalExtras(true);
        setCajaSeleccionada(numeroCaja);
    }
    return(
        <CardCajaStyled onClick={() => handleClick()}>
                  {cajas[numeroCaja] ? 
             <TxtCardCajas>{cajas[numeroCaja].nombre}</TxtCardCajas>
                :
                    <TxtCardCajas>{nombre}</TxtCardCajas>
                }
            
                {cajas[numeroCaja] ? 
                    <ContenedorImgPicture>
                        <ImgPicture src = {cajas[numeroCaja].img} color = {cajas[numeroCaja].bgColor}  alt={'imagen empleado'} top />
                    </ContenedorImgPicture>
                :
                    <ContenedorCaja>
                        {empleado}
                    </ContenedorCaja>
                }
              

            <TxtCardCajas>{numeroCaja}</TxtCardCajas>
        </CardCajaStyled>
    )
}