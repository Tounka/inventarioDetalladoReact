import styled from "styled-components"
import { MetaExtra, TituloCDP } from "../ComponentesGenerales/ComponentesGenericos";
import { ContenedorMetas, BtnStyled } from "../ComponentesGenerales/ComponentesGenericos";
import { ItemToDoList } from "../ComponentesGenerales/Tareas";
import { useState } from "react";
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
    const {setModalCDPToDo, setCrearDocCdp} = useCdp();
    
    const handleClickAgregarTarea = () =>{
        setModalCDPToDo(true);
        setCrearDocCdp(true);
        
        console.log(metaTopping2)
        console.log(metaTopping1)
    } 
    const [tareas, setTareas] = useState({tarea: "Limpiar", fecha: new Date() });
    const [metaTopping2, setMetaTopping2] = useState('');
    const [metaTopping1, setMetaTopping1] = useState('');

    console.log(caja);
    return(
        <ContenedorCdps>
            <Contenedor>
                <TituloCDP> -- {caja[1].nombre} -- </TituloCDP>
                <ContenedorMetas>
                    <MetaExtra input nombre = 'Conos Dobles' setEstado = {setMetaTopping1} />
                    <MetaExtra input nombre = 'Toppings'  setEstado = {setMetaTopping2} />
                </ContenedorMetas>

                <Contenedor>
                    <ItemToDoList admin  />
                    <BtnAgregarTarea onClick={() => handleClickAgregarTarea()}> Agregar tarea </BtnAgregarTarea>
                </Contenedor>
            </Contenedor>
   

       
    
            <BtnStyled type = 'submit' > Actualizar</BtnStyled>
        </ContenedorCdps>
    );
}