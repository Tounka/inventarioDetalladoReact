import React, { useState } from "react";
import '../hojas-de-estilo/FooterPregunta.css';
import { FaFire, FaQuestion, FaExchangeAlt  } from "react-icons/fa";

function FooterPregunta({ numPregunta, setSegundoPoder, setValorPregunta, setTercerPoder,tercerPoder, setNumPregunta, contadorPregunta,  setContadorPregunta}) {
  // Estado para rastrear el uso de cada poder
  const [poderesUsados, setPoderesUsados] = useState({
    poder1: false,
    poder2: false,
    poder3:false,
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
      if(poder === "poder3"){
        
        setNumPregunta(prevNum => prevNum + 1);
        
        
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

      <button
        type="button"
        className={`btn btn-primary poder ${poderesUsados.poder3 ? 'poderUsado' : ''}`}
        onClick={() => manejarPoder('poder3')}
      >
        
        <FaExchangeAlt />
      </button>

      

      {/* Agrega más botones según sea necesario para otros poderes */}

      <h2 className="numPregunta"> {contadorPregunta + 1} / 15 </h2>
    </div>
  );
}

export default FooterPregunta;
