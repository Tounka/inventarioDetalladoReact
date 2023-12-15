import React  from "react";
import TituloPrincipal from "../componentes/TituloPagina";
import TopMcHoot from "../componentes/TopMcHoot";
import Pregunta from "../componentes/Pregunta";
import FooterPregunta from "../componentes/FooterPregunta";
import PantallaFinalizada from "../componentes/PartidaFinalizada";

import todasLasPreguntas from "../js/preguntas";



import { useState } from "react";


function PaginaMcHoot() {

    const [valorPregunta, setValorPregunta] = useState(100)
    const [segundoPoder, setSegundoPoder] = useState(false)

    const [scoreFinal,setScoreFinal] = useState(0);
    const [numPregunta,setNumPregunta] = useState(0);



    return(
        
    <div className="contenedorPaginaMcHoot paginaMinH">
        <TituloPrincipal textoTitulo='McHoot!' />
         
            {
                numPregunta <= 3
                ?
                <>
                    <TopMcHoot score={scoreFinal} />
                    <Pregunta 
                    scoreFinal={scoreFinal}
                    setScoreFinal={setScoreFinal}
                    numPregunta={numPregunta}
                    setNumPregunta={setNumPregunta}  
                    segundoPoder={segundoPoder}
                    setSegundoPoder={setSegundoPoder}
                    
                    pregunta={todasLasPreguntas[numPregunta].pregunta} 
                    respuestas={todasLasPreguntas[numPregunta].respuestas} 
                    respuestaCorrecta={todasLasPreguntas[numPregunta].respuestaCorrecta}
                    valorPregunta={valorPregunta}
                    setValorPregunta = {setValorPregunta}
                    />
                </>
    
                :<PantallaFinalizada score={scoreFinal}  /> //hacer componente para pantalla terminada
            }
            

            <FooterPregunta numPregunta={numPregunta} setSegundoPoder={setSegundoPoder} setValorPregunta = {setValorPregunta} />
     </div>
        
            
       
     
    );
}
export default PaginaMcHoot;