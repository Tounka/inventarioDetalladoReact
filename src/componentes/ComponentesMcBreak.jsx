import React from "react";
import styled from "styled-components";
import { useState } from "react";

const ContenedorCardMcBreak = styled.div`
    height: 300px;
    width: 175px;
    background-color: #B41A4A;
    border-radius: 30px;
    overflow: hidden;
    color: white;
`
const ImagenCardMcBreak = styled.img`
    height: 60%;
    width: 100%;
    object-fit: cover;
    
`
const P = styled.p`
    font-size: 30px;
    font-weight:bold;
    text-align: center;
    margin: 5px;
`
const Psecundario = styled(P)`
    font-size: 15px;
    
`
const ContenedorPsecundarios = styled.div`
    display: flex;
    width: 100%;
    justify-content:center;
`
export function CardMcBreak({SrcImg, Nombre}){
    const [Tiempo1,  setTiempo1] = useState(0);
    const [Tiempo2,  setTiempo2] = useState(0);
    const [Text,  setText] = useState('');
    const [switchFuncion,  setSwitchFuncion] = useState(false);

    const handleClick = (switchFuncion) => {
        const opcionesFormato = {
            hour: 'numeric',
            minute: 'numeric',
            
            hour12: false, 
          };
        if(switchFuncion){
            let tiempoActual = new Date();
            let tiempoDeRegreso = Tiempo2;
            tiempoActual= tiempoActual.toLocaleTimeString('en-US', opcionesFormato);
            
            setText(tiempoDeRegreso + '/' + tiempoActual);

        }else{
            const tiempo = new Date();
            const tiempoDeRegreso = new Date(tiempo);
            tiempoDeRegreso.setMinutes(tiempo.getMinutes() + 30);
       
            
              setTiempo1(tiempo.toLocaleTimeString('en-US', opcionesFormato));
              setTiempo2(tiempoDeRegreso.toLocaleTimeString('en-US', opcionesFormato));
        }
       setSwitchFuncion(!switchFuncion);

        
    }
    return(
        <ContenedorCardMcBreak onClick={() => handleClick(switchFuncion)}>

            <ImagenCardMcBreak src={SrcImg}   />
            <P>{Nombre}</P>
            {Tiempo1 !== 0 ? (
                     !switchFuncion  ? (
                        <ContenedorPsecundarios>
                            <Psecundario>{Tiempo1}</Psecundario>
                            <Psecundario>-</Psecundario>
                            <Psecundario>{Tiempo2}</Psecundario>
                        </ContenedorPsecundarios>
                    ) : (
                        <Psecundario>
                            {Text}
                        </Psecundario>
                    )
            ) : null}
            
            

        </ContenedorCardMcBreak>
    );
} 

