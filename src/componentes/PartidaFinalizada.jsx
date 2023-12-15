import React, { useEffect, useState } from "react";
import '../hojas-de-estilo/PartidaFinalizada.css'
function PantallaFinalizada({score}){
    const [contadorNumIntentos, setContadorNumIntentosLocal] = useState(() => {
        const numIntentos = localStorage.getItem('contadorNumIntentos');
        return numIntentos ? parseInt(numIntentos) : 0;
    });
    const incrementarContador = () => {
        const nuevoContador = contadorNumIntentos + 1;
        setContadorNumIntentosLocal(nuevoContador);
        localStorage.setItem('contadorNumIntentos', nuevoContador.toString());
    };
    useEffect(() => {
        incrementarContador();
    }, []);
    
    return(
        
        <div className="contenedorPantallaFinalizada container-fluid">
            <div className="contenedorTextoPPuntaje">
                <p>McPuntos</p>
                <p>{score}</p>
                <p><span className="subtexto">{contadorNumIntentos} intento</span></p>
            </div>
        </div>
    );  
}

export default PantallaFinalizada;
