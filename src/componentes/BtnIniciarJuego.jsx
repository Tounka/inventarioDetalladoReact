import React from "react";
import "../hojas-de-estilo/BtnIniciarJuego.css";
import img from '../img/gojo.gif'
function BtnIniciarJuego({ funcionBtn }) {
  return (
    <div className="contenedorBtnIniciarJuego container-fluid">
        <div className="contenedorBoton" onClick={funcionBtn}>
            <img src={img} alt="Boton Iniciar Juego" />
            <p className="textoIniciarPartida">Iniciar Juego</p>
        </div>
    </div>
  );
}

export default BtnIniciarJuego;
