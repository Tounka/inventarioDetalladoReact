import React from "react";
import '../hojas-de-estilo/Footer.css'
import styled from "styled-components";
const ContenedorFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 20px ;
    width: 100%;

    text-align: center;
    margin-top: 30px;
    background-color: black;
    color: white;
    font-weight: bold;
    bottom: 0;
`
function Footer ({textoPrincipalFooter, textoSecundarioFooter}){

    return(
        <ContenedorFooter>
            <p className="textoPrincipalF">{textoPrincipalFooter}</p>
            <p className="textoSecundarioF">{textoSecundarioFooter}</p>
        </ContenedorFooter>
    );
}

export default Footer;