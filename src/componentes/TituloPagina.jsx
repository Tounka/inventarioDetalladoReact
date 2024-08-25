import React from "react";
import '../hojas-de-estilo/TituloPagina.css'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";

const ContenedorTitulo = styled.div`
    background-color: #B41A4A;
    min-height: 10vh;
    color: white;
    user-select: none;
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    position: relative;
`
const BtnHome = styled.div`
    font-size: 40px;
    color: white;
    position: absolute;
    margin: 0 20px ;
    left: 0;
    display: ${props => props.display ? props.display : 'flex' };
    justify-content: center;
    align-items: center;
    height: 100%;

    cursor: pointer;



`
function TituloPrincipal({textoTitulo, display}){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return(
        <ContenedorTitulo className="textoTitular">
            <BtnHome onClick={handleClick} >
                <FaHome display={display} />
            </BtnHome>
            <h1 > {textoTitulo} </h1>
        </ContenedorTitulo>
    );
}

export default TituloPrincipal;