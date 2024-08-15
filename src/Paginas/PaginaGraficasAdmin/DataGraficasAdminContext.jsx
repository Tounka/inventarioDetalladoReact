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
        }
    }, [dataResumenUnida]);

    const OrdenarData = (criterio) => {
        const dataRam = [...dataResumenUnida].sort((a, b) => b[criterio] - a[criterio]);
        setDataOrdenada(dataRam);
    };

    const OrdenarDataConDias = (criterio) => {
        const dataRam = [...dataResumenUnida].sort((a, b) => (b[criterio] / b['cantidadTickets']) - (a[criterio] / a['cantidadTickets']));
        setDataOrdenada(dataRam);
    };

    return (
        <DataOrdenadaContext.Provider value={{ dataOrdenada, OrdenarData, OrdenarDataConDias }}>
            {children}
        </DataOrdenadaContext.Provider>
    );
};

// Hook para usar el contexto
export const useDataOrdenada = () => {
    return useContext(DataOrdenadaContext);
};
