import React, { useState } from "react";
import ElementoTablaStyled from '../componentes/ElementoTabla.jsx';
import ElementoTablaInputStyled from '../componentes/ElementoTablaInputStyled.jsx';

const FilaTablaMcAuditoria = ({ pregunta, id, puntos, setPuntaje, puntaje, preguntaAuditoria }) => {
    const [switchPregunta, setSwitchPregunta] = useState(true);

    const validar = (e) => {
        const fila = e.currentTarget.closest('tr'); // Obtener la fila actual
        const elementoPregunta = fila.querySelector('.tablePPregunta'); // Buscar dentro de la fila
        
        const respuestaNegativa = preguntaAuditoria.find(item => item.id === id)?.RespuestaNegativa;
        if(respuestaNegativa === ''){
            setSwitchPregunta(!switchPregunta);
        }
        
        if (!isNaN(puntos)){
            if (switchPregunta ) {
                setPuntaje(puntaje - puntos);
            }else{
                setPuntaje(puntaje + puntos);
            }
        }
        
 

 
        console.log(elementoPregunta);
         // Puedes imprimir el nuevo arreglo para verificar si se ha actualizado correctamente
    };

    return (
        <tr key={id}>
            <ElementoTablaStyled switchPregunta={switchPregunta} setSwitchPregunta={setSwitchPregunta} className={`tablePId align-middle`} funcionOnclick={validar} texto={id}  preguntaAuditoria={preguntaAuditoria} />
            <ElementoTablaInputStyled switchPregunta={switchPregunta} setSwitchPregunta={setSwitchPregunta} className={`tablePPregunta`} texto={pregunta} preguntaAuditoria={preguntaAuditoria} id={id}  />
            <ElementoTablaStyled switchPregunta={switchPregunta} setSwitchPregunta={setSwitchPregunta} className={`tablePPuntos align-middle`} funcionOnclick={validar} texto={puntos} preguntaAuditoria={preguntaAuditoria} />
        </tr>
    );
};

export default FilaTablaMcAuditoria;
