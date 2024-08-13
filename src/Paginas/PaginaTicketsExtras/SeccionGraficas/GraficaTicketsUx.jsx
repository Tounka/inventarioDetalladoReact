import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import styled from 'styled-components';

const ContenedorTxt = styled.p`
    user-select: none;
    font-size: 24px;
    font-weight: bold;
    color: #FFBC0D;
    text-align: center;
    margin: 0;
`;
const ContenedorGraficaInterno = styled.div`
    height: 250px;

`;
    
export const GraficaPiePrincipalUx = ({ data, txt }) => {

    const colores = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
    
    // Asignar un color a cada dato
    const dataWithColors = data.map((entry, index) => ({
        ...entry,
        fill: colores[index % colores.length],
    }));

    return (
        <>

            <ContenedorTxt> {txt} </ContenedorTxt>
            <ContenedorGraficaInterno>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={dataWithColors}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                            {dataWithColors.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value}`, name]} />
                    </PieChart>
                </ResponsiveContainer>
            </ContenedorGraficaInterno>
            
        </>
       
    );
};
