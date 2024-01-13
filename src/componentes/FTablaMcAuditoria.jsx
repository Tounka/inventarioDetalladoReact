import React, { useState } from "react";
import ElementoTabla from '../componentes/ElementoTabla.jsx'
const FilaTablaMcAuditoria = ({ pregunta, id, puntos, setPuntaje, puntaje}) => {
    const [switchPregunta, setSwitchPregunta] = useState(true);
    const validar = () => {
        setSwitchPregunta(!switchPregunta);
        if (switchPregunta) {
            setPuntaje(puntaje +  puntos);
        } else {
            setPuntaje(puntaje -  puntos)
        }
    }
    return (
        <tr key={id}>
            <ElementoTabla switchPregunta={switchPregunta} setSwitchPregunta ={setSwitchPregunta} className={`tablePId align-middle`} funcionOnclick={validar}   texto={id}/>
            <ElementoTabla switchPregunta={switchPregunta} setSwitchPregunta ={setSwitchPregunta} className={`tablePPregunta`} funcionOnclick={validar}   texto={pregunta}/>
            <ElementoTabla switchPregunta={switchPregunta} setSwitchPregunta ={setSwitchPregunta} className={`tablePPuntos align-middle`} funcionOnclick={validar}   texto={puntos}/>
            
          
        </tr>
    );
};

export default FilaTablaMcAuditoria;
