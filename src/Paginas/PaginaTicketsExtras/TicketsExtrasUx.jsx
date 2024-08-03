import styled from "styled-components"
import { Ticket } from "./ComponentesTickets";
const ContenedorPaginaTickets = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
`;
export const PaginaTicketsExtrasUx = () =>{
 
    return(
        <ContenedorPaginaTickets>
            <Ticket />
        </ContenedorPaginaTickets>
    
    )
}