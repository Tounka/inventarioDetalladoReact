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
    flex-direction: column;
    justify-content:center;
    align-items: center;

    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size:22px;
    
    gap: 10px;
    text-align:center;

    @media (max-width: 480px){
        min-width: 105px;
        min-height: 100px;
        
    }

    
`

const ContenedorIcono = styled.div`
    font-size: 42px;
    display: flex;
    @media (max-width: 700px) {
        display: none;
    }
    
`;

export function Tarjeta({nombrePagina, linkPagina, Icon}){

    return(
        <TarjetaIndividual to={linkPagina}>

            <ContenedorIcono>
                <Icon />
            </ContenedorIcono>

            {nombrePagina}
        
        </TarjetaIndividual>
    )
}

export const ContenedorTarjetasLobby = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    height: auto;
    justify-content: space-evenly;
    
    padding: 20px 0;
    
    

`

export const ContenedorPrimario = styled.div`
    padding: 10px 15px;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-around;
`

