import React, { useState } from "react";

import '../hojas-de-estilo/base.css'
import '../hojas-de-estilo/McAuditoria.css'
import {preguntaAuditoria as preguntas} from '../js/objetosAuditoria'
import FilaTablaMcAuditoria from '../componentes/FTablaMcAuditoria.jsx'
function PaginaMcAuditoria(){
    const [puntaje, setPuntaje] = useState(0);
    return(
        <div className="container-sm contenedorPrincipal">
            <h1>McAuditoria</h1>
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
                        <FilaTablaMcAuditoria key={pregunta.id} pregunta={pregunta.pregunta} id={pregunta.id} puntos={pregunta.puntos} setPuntaje={setPuntaje} puntaje={puntaje}/>
                    ))}

                <tr>
                    <td colSpan="2">Puntaje Total</td>
                    <td>{puntaje}</td>
                </tr>
                </tbody>

            </table>

        </div>
        
    );
    

}

export default PaginaMcAuditoria;