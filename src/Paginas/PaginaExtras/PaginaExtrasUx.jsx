import styled from "styled-components"
import { CardCaja } from "./ComponentesExtras"
const ContenedorCardCajas = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 90%;
    gap: 20px;
    max-width: 800px;
`
export const PaginaExtrasUx = () =>{
    return(
        <ContenedorCardCajas>
            <CardCaja />
            <CardCaja />
        </ContenedorCardCajas>
           
        
    )
}