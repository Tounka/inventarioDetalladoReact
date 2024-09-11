import styled from "styled-components"
import { MetaExtra, TituloCDP } from "../ComponentesGenerales/ComponentesGenericos";
import { ContenedorMetas, BtnStyled } from "../ComponentesGenerales/ComponentesGenericos";
import { ItemToDoList } from "../ComponentesGenerales/Tareas";

const ContenedorCdps = styled.div `
    width: 600px;
    height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;

    border: solid 5px var(--RojoPrincipal);
    border-radius: 20px;
    padding: 5px;
   

    user-select: none;
`;

export const CdpGerente = ({caja}) =>{
    console.log(caja)
    return(
        <ContenedorCdps>
            <TituloCDP> -- {caja[1].nombre} -- </TituloCDP>
            
            <ContenedorMetas>
                <MetaExtra input nombre = 'Conos Dobles' />
                <MetaExtra input nombre = 'Toppings'  />
            </ContenedorMetas>

            <ItemToDoList admin />
            
            <BtnStyled> Actualizar</BtnStyled>
        </ContenedorCdps>
    );
}