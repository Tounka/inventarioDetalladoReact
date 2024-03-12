import React from "react";
import styled from "styled-components";

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
export function CardMcBreak({SrcImg, Nombre}){
    const handleClick = () => {
        const tiempo = new Date();
        const tiempoDeRegreso = new Date(tiempo);
        tiempoDeRegreso.setMinutes(tiempo.getMinutes() + 30);
        const opcionesFormato = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true, 
          };
        
        console.log(tiempo.toLocaleTimeString('en-US', opcionesFormato));
        console.log(tiempoDeRegreso.toLocaleTimeString('en-US', opcionesFormato));
        
    }
    return(
        <ContenedorCardMcBreak onClick={handleClick}>
            <ImagenCardMcBreak src={SrcImg}   />
            <P>{Nombre}</P>
            <Psecundario>{Nombre}</Psecundario>
            

        </ContenedorCardMcBreak>
    );
} 

