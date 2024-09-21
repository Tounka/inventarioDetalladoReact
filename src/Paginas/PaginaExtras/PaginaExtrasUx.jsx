import styled from "styled-components"
import { CardCaja, CardNavigate } from "./ComponentesExtras"
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
            <CardCaja numeroCaja="2" />
            <CardCaja numeroCaja="76" />
            <CardCaja numeroCaja="41" />
            <CardCaja numeroCaja="44" />
            <CardCaja numeroCaja="46" />

            <CardCaja numeroCaja="1" />
            <CardNavigate />
        </ContenedorCardCajas>
           
        
    )
}