import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

export const GraficaPiePrincipalUx = ({ data }) => {

    const colores = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
    
    // Asignar un color a cada dato
    const dataWithColors = data.map((entry, index) => ({
        ...entry,
        fill: colores[index % colores.length],
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={dataWithColors}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                />
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};
