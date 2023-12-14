import React  from "react";
import TituloPrincipal from "../componentes/TituloPagina";
import TopMcHoot from "../componentes/TopMcHoot";
import Pregunta from "../componentes/Pregunta";
import FooterPregunta from "../componentes/FooterPregunta";
import PantallaFinalizada from "../componentes/PartidaFinalizada";

import todasLasPreguntas from "../js/preguntas";



import { useState } from "react";


function PaginaMcHoot() {

    
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
                    
                    pregunta={todasLasPreguntas[numPregunta].pregunta} 
                    respuestas={todasLasPreguntas[numPregunta].respuestas} 
                    respuestaCorrecta={todasLasPreguntas[numPregunta].respuestaCorrecta}/>
                </>
    
                :<PantallaFinalizada score={scoreFinal}  /> //hacer componente para pantalla terminada
            }
            

            <FooterPregunta numPregunta={numPregunta}  />
     </div>
        
            
       
     
    );
}
export default PaginaMcHoot;