import { useEffect, useState } from "react";
import styled from "styled-components";
import { GraficaPiePrincipalUx } from "./GraficaTicketsUx";
import { ValoresExtras, useEmpleados } from "../../ContextoGeneral";

const procesarTickets = (dataBruta, SeleccionarEmpleado) => {
    const acumulados = {};
    const extrasTotales = {};
    
    console.log(dataBruta, 'DATA BRUTA');
    for (const [empleadoID, tickets] of Object.entries(dataBruta)) {
        if (!acumulados[empleadoID]) {
            acumulados[empleadoID] = 0;
            extrasTotales[empleadoID] = {};
        }

        tickets.forEach(ticket => {
            const { diferenciaExtras } = ticket;
            for (const [extra, cantidad] of Object.entries(diferenciaExtras)) {
                // Acumulación total de extras por empleado
                if (!extrasTotales[empleadoID][extra]) {
                    extrasTotales[empleadoID][extra] = 0;
                }
                extrasTotales[empleadoID][extra] += cantidad;

                // Acumulación total de extras
                acumulados[empleadoID] = (acumulados[empleadoID] || 0) + cantidad;
            }
        });
    }

    console.log(acumulados, 'acumulados BRUTA');
    console.log(extrasTotales, 'extras TOTALES');

    const calcularDineroEnExtras = ( extras  ) => {
        let valor = 0;
        
       
        for (const extra in extras) {
           
                const valorIterativo = extras[extra] * (ValoresExtras[extra] || 0); // Asegúrate de que ValoresExtras tenga el valor para el extra
                valor += valorIterativo;
            
        }
        return valor;
    };
    

    // Convertir los IDs a nombres usando SeleccionarEmpleado
    const datosProcesadosConValorMonetario = Object.entries(extrasTotales).map(([id, objetoExtras]) => ({
        name: SeleccionarEmpleado(id).nombre,
        value: calcularDineroEnExtras(objetoExtras),
        
    }));
    const datosProcesados = Object.entries(acumulados).map(([id, totalExtras]) => ({
        name: SeleccionarEmpleado(id).nombre,
        value: totalExtras,
        
    }));

    return { datosProcesados, datosProcesadosConValorMonetario };
};

const ContenedorGrafica = styled.div`
    width: 450px;
    height: auto;
    overflow: visible;
`;
const ContenedorGraficas = styled.div`
    width: 100%;
    height: 100%;
    
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export const GraficaPiePrincipal = ({ dataBruta }) => {
    const [data, setData] = useState([]);
    const [dataMonetaria, setDataMonetaria] = useState([]);
    const { SeleccionarEmpleado } = useEmpleados();

    useEffect(() => {
        if (dataBruta && SeleccionarEmpleado) {
            const { datosProcesados, datosProcesadosConValorMonetario } = procesarTickets(dataBruta, SeleccionarEmpleado);
            setData(datosProcesados);
            setDataMonetaria(datosProcesadosConValorMonetario);
            
            
        }
    }, [dataBruta, SeleccionarEmpleado]);

    return (
        <ContenedorGraficas>
            <ContenedorGrafica>
               
                <GraficaPiePrincipalUx data={data} txt={'Numero de extras'} />
            </ContenedorGrafica>

            <ContenedorGrafica>
                
                <GraficaPiePrincipalUx data={dataMonetaria} txt={'Valor de extras'} />
            </ContenedorGrafica>
        </ContenedorGraficas>
    );
};
