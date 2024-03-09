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
    justify-content: space-evenly;
    

`