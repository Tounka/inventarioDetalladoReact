import styled from "styled-components"
const CardCajaStyled = styled.div`
    width: 100%;
    height: 250px;
    display: grid;
    grid-template-rows: 40px auto 40px;
    

`
const TxtCardCajas = styled.div`
    background-color: var(--RojoPrincipal);
    height: 100%;
    
    width:100%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
` 

const ContenedorCaja = styled.div`
    height: 100%;
    width:100%;
    font-size: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
` 
export const CardCaja = ({nombre = 'Selecciona Empleado', numeroCaja = '1', empleado = '1'}) =>{

    return(
        <CardCajaStyled>
            <TxtCardCajas>{nombre}</TxtCardCajas>

                <ContenedorCaja>
                    {empleado}
                </ContenedorCaja>

            <TxtCardCajas>{numeroCaja}</TxtCardCajas>
        </CardCajaStyled>
    )
}