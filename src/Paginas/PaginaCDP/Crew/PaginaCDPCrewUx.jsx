
import { DisplayGenerico } from "../../../componentes/Displays"
import { useEmpleados } from "../../ContextoGeneral";
import { TituloCDP } from "../ComponentesGenerales/ComponentesGenericos";
import { MetaExtra } from "../ComponentesGenerales/ComponentesGenericos";
import { ItemToDoList } from "../ComponentesGenerales/Tareas";

import styled from "styled-components"

const ContenedorPaginaCdp = styled(DisplayGenerico)`
    justify-content: start;
    gap: 20px;
`;

const ContenedorMetas = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 600px;
    max-width: 90%;
    height: 120px;
    gap: 20px;
`;
const ContenedorTareas = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const PaginaCDPCrewUx = ({ meta = '1'}) =>{

    const {cajas, CDPSeleccionado} = useEmpleados();
    
    return(
        <ContenedorPaginaCdp>

            <TituloCDP> -- {cajas[CDPSeleccionado].nombre}  -- </TituloCDP>
            
            <ContenedorMetas>
                <MetaExtra nombre = 'Conos Dobles' numero= {cajas[CDPSeleccionado].meta.conosDobles} />
                <MetaExtra nombre = 'Toppings' numero= {cajas[CDPSeleccionado].meta.toppings} />
            </ContenedorMetas>

            <ContenedorTareas>
                <ItemToDoList />
                <ItemToDoList />
            </ContenedorTareas>

            
        </ContenedorPaginaCdp>
    )
}