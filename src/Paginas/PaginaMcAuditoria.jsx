import React, { useEffect, useState } from "react";
import TituloPrincipal from "../componentes/TituloPagina";
import '../hojas-de-estilo/base.css';
import '../hojas-de-estilo/McAuditoria.css';
import { preguntaAuditoria } from '../js/objetosAuditoria';
import FilaTablaMcAuditoria from '../componentes/FTablaMcAuditoria.jsx';
import BtnImprimirMcAuditoria from '../componentes/BtnImprimirMcAuditoria.jsx';

function PaginaMcAuditoria() {
    const [puntaje, setPuntaje] = useState(92);
    const [preguntas, setPreguntas] = useState(preguntaAuditoria);
    const [numPreguntasCorrectas, setNumPreguntasCorrectas] = useState(0);
    const [preguntasCriticas, SetPreguntasCriticas] = useState(0);
    const [critico, setCritico] = useState(true);
    let puntajeMaximo = 92;

    // useEffect para actualizar puntaje máximo
    useEffect(() => {
        puntajeMaximo = 0;
        preguntas.forEach((pregunta) => { 
            if (!isNaN(Number(pregunta.puntos))) {
                puntajeMaximo += Number(pregunta.puntos);
            }
        });
        console.log(puntajeMaximo); // Puedes usar este valor como necesites
    }, [preguntas]);

    // useEffect para resetear RespuestaNegativa de todas las preguntas
    useEffect(() => {
        const preguntasActualizadas = preguntas.map((pregunta) => ({
            ...pregunta,
            RespuestaNegativa: "" // Asignar "" a todas las respuestas negativas
        }));

        setPreguntas(preguntasActualizadas);
    }, []); // Se ejecuta solo una vez cuando el componente se monta

    // Funciones para calcular puntaje, porcentaje y resultado
    const ObtenerPuntaje = () => {
        if (puntaje < -1) {
            return puntaje + 100;
        } else {
            return puntaje;
        }
    }

    const calcularPorcentaje = () => {
        let numPorciento = (puntaje * 100) / puntajeMaximo;
        console.log(puntaje, 'puntaje ');
        console.log(puntajeMaximo, 'puntaje maximo');
        console.log(numPorciento);
        numPorciento = numPorciento.toFixed(2);
        return numPorciento + '%';
    }

    const calcularResultado = () => {
        let numPorciento = (puntaje * 100) / puntajeMaximo;
        if (numPorciento >= 80 && preguntasCriticas == 0) {
            return 'Aprobado';
        } else {
            return "Reprobada";
        }
    }

    return (
        <>
            <TituloPrincipal textoTitulo="McAuditoria" />
            <div className="container-fluid">
                <div className="container-sm contenedorPrincipal" id="formularioAuditoria">
                    <table className="tablaAuditoria table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Pregunta</th>
                                <th>Puntos</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {preguntas.map((pregunta) => (
                                <FilaTablaMcAuditoria 
                                    setCritico={setCritico} 
                                    key={pregunta.id} 
                                    pregunta={pregunta.pregunta} 
                                    id={pregunta.id} 
                                    puntos={pregunta.puntos} 
                                    setPuntaje={setPuntaje} 
                                    puntaje={puntaje} 
                                    preguntaAuditoria={preguntas} 
                                    setNumPreguntasCorrectas={setNumPreguntasCorrectas} 
                                    numPreguntasCorrectas={numPreguntasCorrectas} 
                                    SetPreguntasCriticas={SetPreguntasCriticas} 
                                    preguntasCriticas={preguntasCriticas} 
                                />
                            ))}
                            <tr>
                                <td colSpan="2">Puntaje Total</td>
                                <td>{ObtenerPuntaje()}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Porcentaje </td>
                                <td>{calcularPorcentaje()}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Resultado </td>
                                <td>{calcularResultado()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <BtnImprimirMcAuditoria 
                        componenteImprimir="formularioAuditoria" 
                        calcularPorcentaje={calcularPorcentaje} 
                        ObtenerPuntaje={ObtenerPuntaje} 
                        calcularResultado={calcularResultado} 
                    />
                </div>
            </div>
        </>
    );
}

export default PaginaMcAuditoria;
