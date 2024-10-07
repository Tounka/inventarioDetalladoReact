
import { DisplayGenerico } from "../../../componentes/Displays"
import { useEmpleados } from "../../Contextos/ContextoGeneral";
import { TituloCDP } from "../ComponentesGenerales/ComponentesGenericos";
import { MetaExtra, BtnStyled } from "../ComponentesGenerales/ComponentesGenericos";
import { ItemToDoList } from "../ComponentesGenerales/Tareas";
import { ContenedorMetas } from "../ComponentesGenerales/ComponentesGenericos";
import styled from "styled-components"
import { useCdp } from "../../Contextos/ContextoCDP";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ContenedorPaginaCdp = styled(DisplayGenerico)`
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 10px 0;
    gap: 20px;
`;


const ContenedorTareas = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
`;
const BtnModal = styled(BtnStyled)`
    height: 60px;
`
const Titulo = styled.div`
    background-color: var(--RojoPrincipal);
    color: white;
    padding: 5px;
    width: 100%;
`

const ContenedorReporteStyled  = styled.div`
    width: 250px;
    height: 250px;
    max-width: 100%; /* Se aplica un max-width para dispositivos móviles */
    height: auto; /* Asegura que la altura se ajuste al contenido */

    color: white;
    background-color: var(--RojoPrincipal);

    font-size: 28px;
    font-weight: bold;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    cursor: pointer;

    padding: 10px;
    border-radius: 10px;
`
const BtnReporte = ({txt, tipoReporte}) =>{
    const {setModalCDPFotos,setReporteSeleccionado} = useCdp();
    const handleClick = () =>{
        
        setModalCDPFotos(true);
        setReporteSeleccionado(tipoReporte)
    }  
    return(
        <ContenedorReporteStyled onClick={() => handleClick()}>
            {txt}
        </ContenedorReporteStyled>
    )
}
export const PaginaCDPCrewUx = () =>{

    const {cajas} = useEmpleados();
    const {CDPSeleccionado, tareasCDP, tareasCDPDiarias, setModalCDPTicket} = useCdp();
    const [tareas, setTareas] = useState([{tarea: "Limpiar", fecha: new Date() }]);

    const navigate = useNavigate();
    const [metaTopping1, setMetaTopping1] = useState(5);
    const [metaTopping2, setMetaTopping2] = useState(5);
    const [tareasFijas, setTareasFijas] = useState([]);

    const handleClickSubirTicket = () => { 
        setModalCDPTicket(true);
        console.log('hola');
    }
    const documentosPorId = tareasCDPDiarias.reduce((obj, doc) => {
        obj[doc.id] = doc;


        return obj;
    }, {});


    const [dataPorCaja, setDataPorCaja] = useState(documentosPorId);

    const date = new Date();
    let ModificadorConosDobles = 5;
    const dayIndex = date.getDay(); 
    switch (dayIndex) {
        case 0:
            ModificadorConosDobles = 15;
            break;
        case 1:
            ModificadorConosDobles = -2;
            break;
        case 2:
            ModificadorConosDobles = 7;
            break;
        case 3:
            ModificadorConosDobles = 3;
            break;
        case 4:
            ModificadorConosDobles = 5;
            break;
        case 5:
            ModificadorConosDobles = 10;
            break;
        case 6:
            ModificadorConosDobles = 12;
            break;
        default:
            ModificadorConosDobles = 0;
    }
    useEffect(() => {
        
        
        if(dataPorCaja[CDPSeleccionado]){

            setMetaTopping1(dataPorCaja[CDPSeleccionado].conosDobles );
            setMetaTopping2(dataPorCaja[CDPSeleccionado].toppings );

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
     
       
            setMetaTopping1(Number(tareasPorId.fijas.conosDobles) + ModificadorConosDobles);
            setMetaTopping2(tareasPorId.fijas.toppings);

            setTareasFijas(tareasPorId.fijas.tareas);
        } else {
            console.log('tareasCDP no está definido o no es un array');
        }
    }, [tareasCDP]);

    useEffect(() =>{
        if(cajas[CDPSeleccionado]?.empleado == ''){
            navigate("/SeleccionaTuCDP");
        }
        
    },[cajas])
    
    return(
        <ContenedorPaginaCdp>

            <TituloCDP> -- {cajas[CDPSeleccionado].nombre}  -- </TituloCDP>
            
            <ContenedorMetas>
                <MetaExtra nombre = 'Conos Dobles' numero= {metaTopping1} />
                <MetaExtra nombre = 'Toppings' numero= {metaTopping2} />
            </ContenedorMetas>

            <ContenedorTareas>
                <TituloCDP small> - Reportes  - </TituloCDP>

                <BtnReporte txt='Inicial' tipoReporte='inicial' />
                <BtnReporte txt='Medio Turno' tipoReporte='intermedio' />
                <BtnReporte txt='Final' tipoReporte='final' />
            </ContenedorTareas>
  

            <BtnModal onClick={() => handleClickSubirTicket()}> Cerrar Turno </BtnModal>
        </ContenedorPaginaCdp>
    )
}