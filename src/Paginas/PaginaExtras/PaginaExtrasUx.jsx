import styled from "styled-components"
import { CardCaja } from "./ComponentesExtras"
const ContenedorCardCajas = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 90%;
    gap: 20px;
    max-width: 800px;
    padding: 20px 0;
`
export const PaginaExtrasUx = () =>{
    return(
        <ContenedorCardCajas>
            <CardCaja numeroCaja="1" />
            <CardCaja numeroCaja="76" />
            <CardCaja numeroCaja="40" />
            <CardCaja numeroCaja="41" />

            <CardCaja numeroCaja="2" />
        </ContenedorCardCajas>
           
        
    )
}