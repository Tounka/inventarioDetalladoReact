import React  from "react";
import TituloPrincipal from "../componentes/TituloPagina";
import TopMcHoot from "../componentes/TopMcHoot";
import Pregunta from "../componentes/Pregunta";
import FooterPregunta from "../componentes/FooterPregunta";

import preguntasCocina from "../js/preguntas";


import { useState } from "react";


function PaginaMcHoot() {
    
    const [scoreFinal,setScoreFinal] = useState(0);
    const [numPregunta,setNumPregunta] = useState(0);
    return(
        <>
            <TituloPrincipal textoTitulo='McHoot!' />
            <TopMcHoot score={scoreFinal} 
       
             />
            {
                numPregunta <= 3
                ?<Pregunta 
                scoreFinal={scoreFinal}
                setScoreFinal={setScoreFinal}
                numPregunta={numPregunta}
                setNumPregunta={setNumPregunta}  
                
                pregunta={preguntasCocina[numPregunta].pregunta} 
                respuestas={preguntasCocina[numPregunta].respuestas} 
                respuestaCorrecta={preguntasCocina[numPregunta].respuestaCorrecta}/>
                :<h2>Haz terminado</h2> //hacer componente para pantalla terminada
            }
            

            <FooterPregunta numPregunta={numPregunta}  />
            
        </>
     
    );
}
export default PaginaMcHoot;