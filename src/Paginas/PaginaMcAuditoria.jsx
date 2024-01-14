import React, { useState } from "react";
import TituloPrincipal from "../componentes/TituloPagina";
import '../hojas-de-estilo/base.css'
import '../hojas-de-estilo/McAuditoria.css'
import {preguntaAuditoria as preguntas} from '../js/objetosAuditoria'
import FilaTablaMcAuditoria from '../componentes/FTablaMcAuditoria.jsx'
import BtnImprimirMcAuditoria  from '../componentes/BtnImprimirMcAuditoria.jsx'
function PaginaMcAuditoria(){
    const [puntaje, setPuntaje] = useState(94);
   
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
                        <FilaTablaMcAuditoria key={pregunta.id} pregunta={pregunta.pregunta} id={pregunta.id} puntos={pregunta.puntos} setPuntaje={setPuntaje} puntaje={puntaje} preguntaAuditoria={preguntas} />
                    ))}

                <tr>
                    <td colSpan="2">Puntaje Total</td>
                    <td>{puntaje}</td>

                </tr>
                    <BtnImprimirMcAuditoria componenteImprimir="formularioAuditoria"/>
                </tbody>

            </table>

        </div>
        </div>
        </>
        
        
        
    );
    

}

export default PaginaMcAuditoria;