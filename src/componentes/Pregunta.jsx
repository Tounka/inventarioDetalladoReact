import React, {useState} from "react";
import '../hojas-de-estilo/Pregunta.css'



function Pregunta({pregunta, respuestas, respuestaCorrecta, setNumPregunta, numPregunta, scoreFinal, setScoreFinal}){
    
    const generarNumerosAleatorios = ()=>{
        let listaOriginal = [0, 1, 2, 3];

        for (let i = listaOriginal.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [listaOriginal[i], listaOriginal[j]] = [listaOriginal[j], listaOriginal[i]];
          }
        return listaOriginal;
    }

    const [textoRespuesta, setTextoRespuesta] = useState(['Correcto', 'La respuesta es: ', 'Ganaste puntos :D']);
    const [ordenPreguntas, setOrdenPreguntas] = useState(generarNumerosAleatorios);
    const validarRespuesta = (index) =>{
        
        if (respuestas[index] === respuestaCorrecta){
            scoreFinal+=100
            setScoreFinal(scoreFinal)
            
            const textoRespuestaEstado = 'La respuesta es correcta es: '+respuestaCorrecta;
            setTextoRespuesta(['Incorrecto',textoRespuestaEstado, 'Ganaste Puntos :D' ])
            
        }else{
            scoreFinal-=100
            setScoreFinal(scoreFinal)
            const textoRespuestaEstado = 'La respuesta es correcta es: '+respuestaCorrecta;
            setTextoRespuesta(['Incorrecto',textoRespuestaEstado, 'Perdiste Puntos :(' ])
        }
        numPregunta++
        setNumPregunta(numPregunta)
        setOrdenPreguntas(generarNumerosAleatorios)
    }

    return(
        <div className="contenedorPregunta container">
            
            <div className="pregunta row">
                <h3>{pregunta}</h3>
            </div>
            <div className="respuestas row container-fluid g-2">
                <div className="posibleRespuesta  col-6">

                    <div className="resp resp0" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() =>validarRespuesta(ordenPreguntas[0])}>
                        {respuestas[ordenPreguntas[0]]}
                    </div>
                </div>
                <div className="posibleRespuesta  col-6">
                    <div className="resp resp1" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() =>validarRespuesta(ordenPreguntas[1])}>
                       {respuestas[ordenPreguntas[1]]} 
                    </div>
                </div>
                <div className="posibleRespuesta  col-6">
                    <div className="resp resp2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() =>validarRespuesta(ordenPreguntas[2])}>
                       {respuestas[ordenPreguntas[2]]} 
                    </div>
                </div>
                <div className="posibleRespuesta  col-6">
                    <div className="resp resp3" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() =>validarRespuesta(ordenPreguntas[3])}>
                       {respuestas[ordenPreguntas[3]]} 
                    </div>
                </div>
            </div>

            
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h2 class="modal-title textoModalRespuesta" id="staticBackdropLabel">{textoRespuesta[0]}</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <h3> {textoRespuesta[1]} </h3>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary">{textoRespuesta[2]}</button>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
}

export default Pregunta;