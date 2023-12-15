import React from "react";
import {  useEffect } from 'react';
import '../hojas-de-estilo/TopMcHoot.css'

function TopMcHoot({score, segundos, setSegundos}){
    

    useEffect(() => {
        // Función para actualizar el temporizador cada segundo
        const interval = setInterval(() => {
          setSegundos((prevSegundos) => {
            if (prevSegundos > 0) {
              return prevSegundos - 1;
            } else {

              return 0;
            }
          });
        }, 1000);
    
        // Limpieza del intervalo al desmontar el componente
        return () => clearInterval(interval);
      }, []);
    const formatoTiempo = (totalSegundos) => {
        const minutos = Math.floor(totalSegundos / 60);
        const segundosRestantes = totalSegundos % 60;
        return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
    };


    return(
        <div className="contenedorTop">
            <div className="timer">
                <h1>Tiempo restante: {formatoTiempo(segundos)}</h1>
            </div>
            <div className="contenedorScore">
                <div className="mcPuntos">
                    McPuntos:
                </div>
                <div className="score">
                 {score} 
                </div>
            </div>

        </div>
    );
}

export default TopMcHoot;