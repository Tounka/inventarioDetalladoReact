import React from "react";
import '../hojas-de-estilo/TituloPagina.css'
function TituloPrincipal({textoTitulo}){
    return(
        <h1 className="textoTitular"> {textoTitulo} </h1>
    );
}
export default TituloPrincipal;