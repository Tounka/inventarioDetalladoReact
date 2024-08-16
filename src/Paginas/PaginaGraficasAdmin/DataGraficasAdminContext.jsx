import React, { createContext, useState, useContext, useEffect } from 'react';
import { procesarTicketsExtras } from '../PaginaTicketsExtras/SeccionGraficas/ProcesadoGeneralData';
import { useEmpleados } from '../ContextoGeneral';

// Crear el contexto
const DataOrdenadaContext = createContext();

// Proveedor del contexto
export const DataOrdenadaProvider = ({ children, dataBruta }) => {
    const { SeleccionarEmpleado } = useEmpleados();

    const [dataResumen, setDataResumen] = useState([]);
    const [dataMonetariaResumen, setDataMonetariaResumen] = useState([]);
    const [dataResumenUnida, setDataResumenUnida] = useState([]);
    const [dataSeleccionada, setDataSeleccionada] = useState();

    useEffect(() => {
        if (dataBruta && SeleccionarEmpleado) {
            const { datosProcesados, datosProcesadosConValorMonetario } = procesarTicketsExtras(dataBruta, SeleccionarEmpleado);
            setDataResumen(datosProcesados);
            setDataMonetariaResumen(datosProcesadosConValorMonetario);
        }
    }, [dataBruta, SeleccionarEmpleado]);

    useEffect(() => {
        if (dataResumen.length && dataMonetariaResumen.length) {
            const unirArreglo = dataResumen.map(item1 => {
                const foundItem = dataMonetariaResumen.find(item2 => item2.id === item1.id);
                if (foundItem) {
                    return {
                        ...item1,
                        valueMonetario: item1.value + foundItem.value // Agregar el nuevo valor como valueMonetario
                    };
                }
                return item1;
            });
            setDataResumenUnida(unirArreglo);
        }
    }, [dataResumen, dataMonetariaResumen]);

    const [dataOrdenada, setDataOrdenada] = useState([]);

    useEffect(() => {
        if (dataResumenUnida.length) {
            OrdenarData("value");
            setDataSeleccionada("value");
        }
    }, [dataResumenUnida]);

    const OrdenarData = (criterio) => {
        const dataRam = [...dataResumenUnida].sort((a, b) => b[criterio] - a[criterio]);
        setDataOrdenada(dataRam);
        setDataSeleccionada(criterio);
    };

    const OrdenarDataConDias = (criterio) => {
        const dataRam = [...dataResumenUnida].map(item => ({
            ...item,
            [criterio + "conDias"]: item[criterio] / item['cantidadTickets']
        })).sort((a, b) => 
            b[criterio + "conDias"] - a[criterio + "conDias"]
        );
        setDataOrdenada(dataRam);
        setDataSeleccionada(criterio + "conDias" );
    };

    return (
        <DataOrdenadaContext.Provider value={{ dataOrdenada, OrdenarData, OrdenarDataConDias, dataSeleccionada }}>
            {children}
        </DataOrdenadaContext.Provider>
    );
};

// Hook para usar el contexto
export const useDataOrdenada = () => {
    return useContext(DataOrdenadaContext);
};
