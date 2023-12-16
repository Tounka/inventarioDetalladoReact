import React, { useState } from "react";
import '../hojas-de-estilo/FooterPregunta.css';
import { FaFire, FaQuestion  } from "react-icons/fa";

function FooterPregunta({ numPregunta, setSegundoPoder, setValorPregunta }) {
  // Estado para rastrear el uso de cada poder
  const [poderesUsados, setPoderesUsados] = useState({
    poder1: false,
    poder2: false,
    // Agrega más poderes según sea necesario
  });

  // Función para manejar el uso de un poder específico
  const manejarPoder = (poder) => {
    // Verificar si el poder ya ha sido usado
    if (!poderesUsados[poder]) {
      // Realizar acciones relacionadas con el poder
      if(poder === "poder1"){
        setValorPregunta(200)
      }
      if(poder === "poder2"){
        setSegundoPoder(true)
        
      }
      

      // Marcar el poder como usado
      setPoderesUsados((prevPoderes) => ({
        ...prevPoderes,
        [poder]: true,
      }));
    }
  };

  return (
    <div className="contenedorFooterPregunta">
      
      <button
        type="button"
        className={`btn btn-primary poder ${poderesUsados.poder1 ? 'poderUsado' : ''}`}
        onClick={() => manejarPoder('poder1')}
      >
        <FaFire />
      </button>

      
      <button
        type="button"
        className={`btn btn-primary poder ${poderesUsados.poder2 ? 'poderUsado' : ''}`}
        onClick={() => manejarPoder('poder2')}
      >
        
        <FaQuestion />
      </button>

      

      {/* Agrega más botones según sea necesario para otros poderes */}

      <h2 className="numPregunta"> {numPregunta + 1} / 15 </h2>
    </div>
  );
}

export default FooterPregunta;
