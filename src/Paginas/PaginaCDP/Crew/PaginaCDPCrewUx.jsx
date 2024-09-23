
import { DisplayGenerico } from "../../../componentes/Displays"
import { useEmpleados } from "../../Contextos/ContextoGeneral";
import { TituloCDP } from "../ComponentesGenerales/ComponentesGenericos";
import { MetaExtra, BtnStyled } from "../ComponentesGenerales/ComponentesGenericos";
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
    align-items: center;
    gap: 10px;
    width: 100%;
`;

export const PaginaCDPCrewUx = () =>{

    const {cajas} = useEmpleados();
    const {CDPSeleccionado, tareasCDP, tareasCDPDiarias} = useCdp();
    const [tareas, setTareas] = useState([{tarea: "Limpiar", fecha: new Date() }]);

    const [metaTopping1, setMetaTopping1] = useState(5);
    const [metaTopping2, setMetaTopping2] = useState(5);
    const [tareasFijas, setTareasFijas] = useState([]);

    const handleClickSubirTicket = () => { 
        console.log('hola');
    }
    const documentosPorId = tareasCDPDiarias.reduce((obj, doc) => {
        obj[doc.id] = doc;


        return obj;
    }, {});


    const [dataPorCaja, setDataPorCaja] = useState(documentosPorId);


    

    useEffect(() => {
        
        if(dataPorCaja[CDPSeleccionado]){

            setMetaTopping1(dataPorCaja[CDPSeleccionado].conosDobles);
            setMetaTopping2(dataPorCaja[CDPSeleccionado].toppings);

            setTareasFijas(dataPorCaja[CDPSeleccionado].tareas);
        }
        else if (tareasCDP && Array.isArray(tareasCDP)) {
           
            const tareasPorId = tareasCDP.reduce((acc, item) => {
                if (item.id) {
                    acc[item.id] = item;
                }
                return acc;
            }, {});


            console.log(tareasPorId, 'asdasd')
            setTareas(tareasPorId); // Actualizar el estado con el objeto de objetos

       
            setMetaTopping1(tareasPorId.fijas.conosDobles);
            setMetaTopping2(tareasPorId.fijas.toppings);

            setTareasFijas(tareasPorId.fijas.tareas);
        } else {
            console.log('tareasCDP no está definido o no es un array');
        }
    }, [tareasCDP]);
    
    return(
        <ContenedorPaginaCdp>

            <TituloCDP> -- {cajas[CDPSeleccionado].nombre}  -- </TituloCDP>
            
            <ContenedorMetas>
                <MetaExtra nombre = 'Conos Dobles' numero= {metaTopping1} />
                <MetaExtra nombre = 'Toppings' numero= {metaTopping2} />
            </ContenedorMetas>

            <ContenedorTareas>
                {tareasFijas.map((tarea, id)=>(
                            
                            <ItemToDoList  txtTarea={tarea.tarea} setTareas={setTareas} />
                        ))}
            </ContenedorTareas>

            <BtnStyled onClick={() => handleClickSubirTicket()}> Subir Ticket </BtnStyled>
        </ContenedorPaginaCdp>
    )
}