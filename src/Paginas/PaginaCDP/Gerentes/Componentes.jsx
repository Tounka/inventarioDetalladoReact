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
    const {setModalCDPToDo, setCrearDocCdp, tareasCDP, CrearDocumentoMeta} = useCdp();
    const [metasDiarias,setMetasDiarias] = useState();
    const handleClickAgregarTarea = () =>{
        setModalCDPToDo(true);
        setCrearDocCdp(true);
        

        //console.log(metaTopping2)
        //console.log(metaTopping1)


    } 
    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = {tareas: tareas, toppings: metaTopping2, conosDobles: metaTopping1};
        CrearDocumentoMeta("diarias", "Metas", data);
        
    }
    const [tareas, setTareas] = useState([{tarea: "Limpiar", fecha: new Date() }]);

    useEffect(() =>{
        
        const tareasArreglo = Object.values(Object.values(tareasCDP[0].tareas));
        setTareas(tareasArreglo);
        
       
    }, [tareasCDP]);

    const [metaTopping2, setMetaTopping2] = useState('');
    const [metaTopping1, setMetaTopping1] = useState('');


    return(
        <ContenedorCdps>
            <Contenedor>
                <TituloCDP> -- {caja[1].nombre} -- </TituloCDP>
                <ContenedorMetas>
                    <MetaExtra input nombre = 'Conos Dobles' setEstado = {setMetaTopping1} cajaSeleccionada = {caja[0]} setTareas={setTareas} />
                    <MetaExtra input nombre = 'Toppings'  setEstado = {setMetaTopping2} cajaSeleccionada = {caja[0]} setTareas={setTareas} />
                </ContenedorMetas>

                <Contenedor>
                    {tareas.map((tarea, id)=>(
                        
                        <ItemToDoList admin txtTarea={tarea.tarea} cajaSeleccionada = {caja[0]} setTareas={setTareas} />
                    ))}
                    
                    <BtnAgregarTarea onClick={() => handleClickAgregarTarea()}> Agregar tarea </BtnAgregarTarea>
                </Contenedor>
            </Contenedor>
   

       
    
            <BtnStyled type = 'submit' onClick={handleSubmit} > Actualizar</BtnStyled>
        </ContenedorCdps>
    );
}