import { useEffect, useState } from "react";
import styled from "styled-components";
import { GraficaPiePrincipalUx } from "./GraficaTicketsUx";
import { ValoresExtras, useEmpleados } from "../../ContextoGeneral";
import { procesarTicketsExtras } from "./ProcesadoGeneralData";


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
            const { datosProcesados, datosProcesadosConValorMonetario } = procesarTicketsExtras(dataBruta, SeleccionarEmpleado);
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
