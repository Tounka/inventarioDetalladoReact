import styled from "styled-components"
import { MetaExtra, TituloCDP } from "../ComponentesGenerales/ComponentesGenericos";
import { ContenedorMetas, BtnStyled } from "../ComponentesGenerales/ComponentesGenericos";
import { ItemToDoList } from "../ComponentesGenerales/Tareas";
import { useEffect, useState } from "react";
import { useCdp } from "../../Contextos/ContextoCDP";

const ContenedorCdps = styled.form `
    width: 600px;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    border: solid 5px var(--RojoPrincipal);
    border-radius: 20px;
    padding: 5px;
   
    gap: 10px;
    user-select: none;
`;
const Contenedor= styled.div`
    display: flex;
    width: 100%;
    gap: 10px;
    flex-direction: column;
    align-items: center;
`;
const BtnAgregarTarea = styled.div`
    padding: 10px 20px;
    border-radius: 5px;
    background-color: var(--AmarilloPrincipal);
    color: var(--AzulPrincipal);
    cursor: pointer;
`;

export const CdpGerente = ({caja}) =>{
    const {setModalCDPToDo, setCrearDocCdp, tareasCDP, CrearDocumentoMeta, CDPSeleccionado, tareasCDPDiarias} = useCdp();
    
   
    const handleClickAgregarTarea = () =>{
        setModalCDPToDo(true);
        setCrearDocCdp(true);
        

        //console.log(metaTopping2)
        //console.log(metaTopping1)


    } 
    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = {conosDobles:metaTopping1, toppings:metaTopping2, tareas:tareasFijas, fecha : new Date() } ;
        CrearDocumentoMeta(CDPSeleccionado, "Metas", data);
        
    }
    const [tareas, setTareas] = useState([{tarea: "Limpiar", fecha: new Date() }]);
    const [tareasFijas, setTareasFijas] = useState([{tarea: "Limpiar", fecha: new Date() }]);

  
    const documentosPorId = tareasCDPDiarias.reduce((obj, doc) => {
        obj[doc.id] = doc;

        
        return obj;
    }, {});


    const [dataPorCaja, setDataPorCaja] = useState(documentosPorId);


    const [metaTopping1, setMetaTopping1] = useState('');
    const [metaTopping2, setMetaTopping2] = useState('');

    useEffect(() => { 
        
        if(dataPorCaja[caja[0]]){

            setMetaTopping1(dataPorCaja[caja[0]].conosDobles);
            setMetaTopping2(dataPorCaja[caja[0]].toppings);

            setTareasFijas(dataPorCaja[caja[0]].tareas);
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
        <ContenedorCdps>
            <Contenedor>
                <TituloCDP> -- {caja[1].nombre} -- </TituloCDP>
                <ContenedorMetas>
                    <MetaExtra input nombre = 'Conos Dobles' setEstado = {setMetaTopping1} cajaSeleccionada = {caja[0]} setTareas={setTareas}  numero={metaTopping1} />
                    <MetaExtra input nombre = 'Toppings'  setEstado = {setMetaTopping2} cajaSeleccionada = {caja[0]} setTareas={setTareas} numero={metaTopping2}  />
                </ContenedorMetas>

                <Contenedor>
                    {tareasFijas.map((tarea, id)=>(
                        
                        <ItemToDoList admin txtTarea={tarea.tarea} cajaSeleccionada = {caja[0]} setTareas={setTareas} />
                    ))}
                    
                    <BtnAgregarTarea onClick={() => handleClickAgregarTarea()}> Agregar tarea </BtnAgregarTarea>
                </Contenedor>
            </Contenedor>
   

       
    
            <BtnStyled type = 'submit' onClick={handleSubmit} > Actualizar</BtnStyled>
        </ContenedorCdps>
    );
}