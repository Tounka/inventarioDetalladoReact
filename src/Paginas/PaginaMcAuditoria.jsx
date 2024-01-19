import React, { useState } from "react";
import TituloPrincipal from "../componentes/TituloPagina";
import '../hojas-de-estilo/base.css'
import '../hojas-de-estilo/McAuditoria.css'
import {preguntaAuditoria as preguntas} from '../js/objetosAuditoria'
import FilaTablaMcAuditoria from '../componentes/FTablaMcAuditoria.jsx'
import BtnImprimirMcAuditoria  from '../componentes/BtnImprimirMcAuditoria.jsx'
function PaginaMcAuditoria(){
    const [puntaje, setPuntaje] = useState(94);
    const [numPreguntasCorrectas, setNumPreguntasCorrectas] = useState(0);
    const [critico, setCritico] = useState(true);
    
    const ObtenerPuntaje = ()=>{
        if(puntaje<-1){
            return(puntaje + 100);
        }else{
            return(puntaje)
        }
    }
    const calcularPorcentaje = () => {
        let numPorciento = (puntaje / 94) * 100;

        if (numPorciento >= 90 && critico){
            return numPorciento + '%';
        }else{
            return "Reprobada"
        }
        
    }
    
    return(
        <>
        <TituloPrincipal  textoTitulo="McAuditoria" />
        <div className="container-fluid" >
            

            <div className="container-sm contenedorPrincipal" id="formularioAuditoria">
            
            <table className="tablaAuditoria table ">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Pregunta</th>
                        <th>Puntos</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {preguntas.map((pregunta) => (
                        <FilaTablaMcAuditoria setCritico={setCritico} key={pregunta.id} pregunta={pregunta.pregunta} id={pregunta.id} puntos={pregunta.puntos} setPuntaje={setPuntaje} puntaje={puntaje} preguntaAuditoria={preguntas} setNumPreguntasCorrectas={setNumPreguntasCorrectas} numPreguntasCorrectas={numPreguntasCorrectas} />
                    ))}

                <tr>
                    <td colSpan="2">Puntaje Total</td>
                    <td>{ObtenerPuntaje()}</td>
                </tr>
                <tr>
                    <td colSpan="2">Porcentaje </td>
                    <td>{calcularPorcentaje()}</td>
                </tr>
                    <BtnImprimirMcAuditoria componenteImprimir="formularioAuditoria" calcularPorcentaje ={calcularPorcentaje} ObtenerPuntaje={ObtenerPuntaje}/>
                </tbody>

            </table>

        </div>
        </div>
        </>
        
        
        
    );
    

}

export default PaginaMcAuditoria;