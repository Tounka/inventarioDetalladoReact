import React from "react";
import styled from "styled-components";

const ContenedorCardMcBreak = styled.div`
    height: 250px;
    width: 150px;
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
export function CardMcBreak({SrcImg, Nombre}){
    return(
        <ContenedorCardMcBreak>
            <ImagenCardMcBreak src={SrcImg}   />
            <h1>{Nombre}</h1>
        </ContenedorCardMcBreak>
    );
} 

