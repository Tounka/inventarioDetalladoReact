import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import '../hojas-de-estilo/Pregunta.css';
import sonidoMal from "../img/bu.mp3"; // Asegúrate de proporcionar la ruta correcta al archivo de sonido
import sonidoBien from "../img/mcFantastico.mp3"; // Asegúrate de proporcionar la ruta correcta al archivo de sonido

function Pregunta({ pregunta, respuestas, respuestaCorrecta, setNumPregunta, numPregunta, scoreFinal, setScoreFinal,valorPregunta, setValorPregunta, setSegundoPoder, segundoPoder, setTercerPoder, tercerPoder}) {

  const generarNumerosAleatorios = () => {
    let listaOriginal = [0, 1, 2, 3];

    for (let i = listaOriginal.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [listaOriginal[i], listaOriginal[j]] = [listaOriginal[j], listaOriginal[i]];
    }
    return listaOriginal;
  }

  const [textoRespuesta, setTextoRespuesta] = useState(['Correcto', 'La respuesta es: ', 'Ganaste puntos :D']);
  const [ordenPreguntas, setOrdenPreguntas] = useState(generarNumerosAleatorios);
  const [showModal, setShowModal] = useState(false);



  const reproducirSonido = (sonidoAusar) => {
    
    const audio = new Audio(sonidoAusar);
    audio.pause();
    audio.play();
  };

  const validarRespuesta = (index) => {
    
    if (respuestas[index] === respuestaCorrecta) {
      reproducirSonido(sonidoBien)
      setScoreFinal(prevScore => prevScore + valorPregunta);

      const textoRespuestaEstado = 'La respuesta es correcta es: ' + respuestaCorrecta;
      setTextoRespuesta(['Correcto', textoRespuestaEstado, 'Ganaste Puntos :D'])
      
    } else {
      reproducirSonido(sonidoMal)
      setScoreFinal(prevScore => prevScore - (valorPregunta / 2));
      setShowModal(true);

      const textoRespuestaEstado = 'La respuesta es correcta es: ' + respuestaCorrecta;
      setTextoRespuesta(['Incorrecto', textoRespuestaEstado, 'Perdiste Puntos :('])
      
    }
    
    

    setNumPregunta(prevNum => prevNum + 1);
    setOrdenPreguntas(generarNumerosAleatorios);

    setSegundoPoder(false);
    setValorPregunta(100);
  }

  const handleCloseModal = () => setShowModal(false);
  
  const segundoPoderFuncion = (respesta) => {
    let resultado = "";
    
    if (segundoPoder && respuestas[respesta] !== respuestaCorrecta) {
      const probabilidad = Math.random();
      
      if (probabilidad < 1) {
        resultado = "respuestaIncorrecta";
      }
     
        // Se establece segundoPoder como false aquí
    }


    
    return resultado;
  }


  return (
    <div className="contenedorPregunta container">
      <div className="pregunta row">
        <h3>{pregunta}</h3>
      </div>
      <div className="respuestas row container-fluid g-2">
        <div className="posibleRespuesta  col-sm-6">
          <div className={`resp resp0 ${segundoPoder ? segundoPoderFuncion(ordenPreguntas[0]) : ''}`}  onClick={() => validarRespuesta(ordenPreguntas[0])}>
            {respuestas[ordenPreguntas[0]]}
          </div>
        </div>
        <div className="posibleRespuesta  col-sm-6">
          <div className={`resp resp1 ${segundoPoder ? segundoPoderFuncion(ordenPreguntas[1]) : ''}`} onClick={() => validarRespuesta(ordenPreguntas[1])}>
            {respuestas[ordenPreguntas[1]]}
          </div>
        </div>
        <div className="posibleRespuesta  col-sm-6">
          <div className={`resp resp2 ${segundoPoder ? segundoPoderFuncion(ordenPreguntas[2]) : ''}`} onClick={() => validarRespuesta(ordenPreguntas[2])}>
            {respuestas[ordenPreguntas[2]]}
          </div>
        </div>
        <div className="posibleRespuesta  col-sm-6">
          <div className={`resp resp3 ${segundoPoder ? segundoPoderFuncion(ordenPreguntas[3]) : ''}`} onClick={() => validarRespuesta(ordenPreguntas[3])}>
            {respuestas[ordenPreguntas[3]]}
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{textoRespuesta[0]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{textoRespuesta[1]}</h3>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
          <button className="btn btn-primary" onClick={handleCloseModal}>{textoRespuesta[2]}</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Pregunta;
