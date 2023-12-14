import React from "react";
import '../hojas-de-estilo/FooterPregunta.css'
function FooterPregunta({numPregunta}) {
  return (
        <h2 className="numPregunta"> {numPregunta+1} / 15 </h2>
        
    )
}

export default FooterPregunta;
