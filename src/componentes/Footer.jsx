import React from "react";
import '../hojas-de-estilo/Footer.css'
function Footer ({textoPrincipalFooter, textoSecundarioFooter}){

    return(
        <div className="contenedorFooter">
            <p className="textoPrincipalF">{textoPrincipalFooter}</p>
            <p className="textoSecundarioF">{textoSecundarioFooter}</p>
        </div>
    );
}

export default Footer;