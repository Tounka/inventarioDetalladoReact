import { BarChart, Bar, ResponsiveContainer, Legend, Tooltip, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
import { useDataOrdenada } from '../DataGraficasAdminContext';
import styled from 'styled-components';
import { useEffect } from 'react';

const ContenedorGraficaBarras = styled.div`
    width: 100%;
    max-width: 700px;
    height: 700px;
    
    background-color: white;

    @media (max-width: 600px) {
      font-size: 16px;
      height: 400px ;
    }
`;

export const GraficaResumen = () => {
    const { dataOrdenada, dataSeleccionada } = useDataOrdenada();

    useEffect(() => {
        console.log(dataOrdenada);
    }, [dataOrdenada]);

    // Diccionario para mapear los nombres de las propiedades a etiquetas
    const etiquetas = {
        value: 'Cantidad',
        valueconDias: 'Cantidad por día',
        valueMonetario: '$',
        valueMonetarioconDias: '$ por día'
    };

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
                    <Legend 
                        formatter={(value) => etiquetas[value] || value}  // Default to original value if not in etiquetas
                        verticalAlign="top" 
                        height={36} 
                    />
                    <Bar 
                        dataKey={dataSeleccionada} 
                        name={etiquetas[dataSeleccionada] || dataSeleccionada}  // Default to original value if not in etiquetas
                        fill="#8884d8" 
                        radius={[10, 10, 0, 0]}
                    >
                        <LabelList dataKey={dataSeleccionada} position="top" fill="#000" />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ContenedorGraficaBarras>
    );
};
