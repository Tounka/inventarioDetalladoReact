import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TarjetaIndividual = styled(Link) `
    background-color: #B41A4A;
    border-radius: 20px;
    min-width: 250px;
    min-height: 200px;
    width: 45%;
    display:flex;
    justify-content:center;
    align-items: center;

    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size:22px;
    margin-bottom: 30px;
    text-align:center;

    @media (max-width: 480px){
        min-width: 105px;
        min-height: 100px;
        
    }

    
`

export function Tarjeta({nombrePagina, linkPagina}){

    return(
        <TarjetaIndividual to={linkPagina}>
            {nombrePagina}
        </TarjetaIndividual>
    )
}

export const ContenedorTarjetasLobby = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    justify-content: space-evenly;
    
    

`

export const ContenedorPrimario = styled.div`
    padding: 10px 15px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-around;
`

