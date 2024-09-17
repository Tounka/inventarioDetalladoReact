
import { DisplayGenerico } from "../../../componentes/Displays"
import { useEmpleados } from "../../Contextos/ContextoGeneral";
import { TituloCDP } from "../ComponentesGenerales/ComponentesGenericos";
import { MetaExtra } from "../ComponentesGenerales/ComponentesGenericos";
import { ItemToDoList } from "../ComponentesGenerales/Tareas";
import { ContenedorMetas } from "../ComponentesGenerales/ComponentesGenericos";
import styled from "styled-components"
import { useCdp } from "../../Contextos/ContextoCDP";
import { useEffect, useState } from "react";

const ContenedorPaginaCdp = styled(DisplayGenerico)`
    justify-content: start;
    gap: 20px;
`;


const ContenedorTareas = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const PaginaCDPCrewUx = ({ meta = '1'}) =>{

    const {cajas} = useEmpleados();
    const {CDPSeleccionado, tareasCDP} = useCdp();

    
    
    const [tareas, setTareas] = useState([{tarea: "Limpiar", fecha: new Date() }]);
    
    useEffect(() =>{
        
        const tareasArreglo = Object.values(Object.values(tareasCDP[0].tareas));
        setTareas(tareasArreglo);
        
       
    }, [tareasCDP]);
    
    return(
        <ContenedorPaginaCdp>

            <TituloCDP> -- {cajas[CDPSeleccionado].nombre}  -- </TituloCDP>
            
            <ContenedorMetas>
                <MetaExtra nombre = 'Conos Dobles' numero= {5} />
                <MetaExtra nombre = 'Toppings' numero= {5} />
            </ContenedorMetas>

            <ContenedorTareas>
                {tareas.map((tarea, id)=>(
                            
                            <ItemToDoList  txtTarea={tarea.tarea} setTareas={setTareas} />
                        ))}
            </ContenedorTareas>

            
        </ContenedorPaginaCdp>
    )
}