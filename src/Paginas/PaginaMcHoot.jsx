import React, { useState } from "react";
import TituloPrincipal from "../componentes/TituloPagina";
import TopMcHoot from "../componentes/TopMcHoot";
import Pregunta from "../componentes/Pregunta";
import FooterPregunta from "../componentes/FooterPregunta";
import PantallaFinalizada from "../componentes/PartidaFinalizada";
import todasLasPreguntas from "../js/preguntas";
import BtnIniciarJuego from "../componentes/BtnIniciarJuego";


function PaginaMcHoot() {
  const [iniciarJuego, setIniciarJuego] = useState(false);
  const [segundos, setSegundos] = useState(5 * 60);

  const [valorPregunta, setValorPregunta] = useState(100);
  const [tercerPoder, setTercerPoder] = useState(false);
  const [segundoPoder, setSegundoPoder] = useState(false);

  const [scoreFinal, setScoreFinal] = useState(0);

  const [numPregunta, setNumPregunta] = useState(0);
  const [contadorPregunta, setContadorPregunta] = useState(0);

  const handleIniciarJuego = () => {
    setIniciarJuego(true);
  };

  return (
    <div className="contenedorPaginaMcHoot paginaMinH">
      <TituloPrincipal textoTitulo="McHoot!" />

      {!iniciarJuego ? (
        <>
            <BtnIniciarJuego funcionBtn = {handleIniciarJuego} />
            
        </>

        
      ) : (
        <>
          {contadorPregunta <= 3 && segundos > 0 ? (
            <>
              <TopMcHoot
                score={scoreFinal}
                segundos={segundos}
                setSegundos={setSegundos}
              />
              <Pregunta
                scoreFinal={scoreFinal}
                setScoreFinal={setScoreFinal}
                numPregunta={numPregunta}
                setNumPregunta={setNumPregunta}
                contadorPregunta = {contadorPregunta}
                setContadorPregunta = {setContadorPregunta}

                segundoPoder={segundoPoder}
                setSegundoPoder={setSegundoPoder}
                tercerPoder={tercerPoder}
                setTercerPoder={setTercerPoder}

                pregunta={todasLasPreguntas[numPregunta].pregunta}
                respuestas={todasLasPreguntas[numPregunta].respuestas}
                respuestaCorrecta={
                  todasLasPreguntas[numPregunta].respuestaCorrecta
                }
                valorPregunta={valorPregunta}
                setValorPregunta={setValorPregunta}
              />
            </>
          ) : (
            <PantallaFinalizada score={scoreFinal} />
          )}

          <FooterPregunta
            numPregunta={numPregunta}
            setNumPregunta={setNumPregunta}
            contadorPregunta = {contadorPregunta}
            setContadorPregunta = {setContadorPregunta}

            tercerPoder={tercerPoder}
            setTercerPoder={setTercerPoder}
            setSegundoPoder={setSegundoPoder}
            setValorPregunta={setValorPregunta}
          />
        </>
      )}
    </div>
  );
}

export default PaginaMcHoot;
