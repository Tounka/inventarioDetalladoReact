import { BarChart, Bar, ResponsiveContainer, Legend, Tooltip, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
import { useDataOrdenada } from '../DataGraficasAdminContext';
import styled from 'styled-components';
import { useEffect } from 'react';

const ContenedorGraficaBarras = styled.div`
    width: 100%;
    max-width: 700px;
    height: 700px;
    margin: 0 auto;  /* Centra la gráfica */
    background-color: white;
`;

export const GraficaResumen = () => {
    const { dataOrdenada } = useDataOrdenada();

    useEffect(() => {
        console.log(dataOrdenada);
    }, [dataOrdenada]);

    // Ajustar los datos para evitar valores negativos
    const datosPositivos = dataOrdenada.map(item => ({
        ...item,
        value: Math.max(item.value, 0),
        valueMonetario: Math.max(item.valueMonetario, 0)
    }));

    return (
        <ContenedorGraficaBarras>
            <ResponsiveContainer width="100%" height="100%">

                <BarChart data={datosPositivos} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 'dataMax + 10']} /> {/* Asegura que el eje Y comience desde 0 */}
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 0, 0]}>
                        <LabelList dataKey="value" position="top" fill="#000" />
                    </Bar>
                    <Bar dataKey="valueMonetario" fill="#82ca9d" radius={[10, 10, 0, 0]}>
                        <LabelList dataKey="valueMonetario" position="top" fill="#000" />
                    </Bar>
                </BarChart>
                
            </ResponsiveContainer>
        </ContenedorGraficaBarras>
    );
};
