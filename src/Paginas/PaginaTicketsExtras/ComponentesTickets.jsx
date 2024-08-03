import styled from "styled-components"


const ContenedorTicket = styled.div`
    width: 250px;
    height: 400px;
    max-height: auto;

    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    background-color: #f7f7ec;
    padding: 10px 5px;
    gap: 10px;
    
    clip-path: polygon(
        5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%
    );
`;
const TxtTicket = styled.p`
    text-align: center;
    width: 100%;
    user-select: none;

    font-size: ${props => props.Fsize ? props.Fsize : '18px'};
    font-weight: ${props => props.bold ? 'bold' : ''};
`;

const ContenedorFecha = styled.div`
    display: flex;
    flex-direction: row;

`;

const ContenedorExtraStyled = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 2fr 7fr;

    gap: 5px;
    padding: 0 40px;

`;
const TxtExtra = styled(TxtTicket)`
    background-color: #FFBC0D;
    clip-path: ${props => props.especial ? 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' : ''} ;
    padding: 0 20px;
`;

const Extra = ({cantidad = '0', nombre = 'Tocino'}) =>{
    return(
        <ContenedorExtraStyled>
            <TxtExtra especial>{cantidad}</TxtExtra>
            <TxtExtra>{nombre}</TxtExtra>
        </ContenedorExtraStyled>
    )
}

export const Ticket = ({pos= 'POS', empleado = 'Empleado', tickets= [], fechaInicio= 'Inicio', fechaFinal= 'Fin'}) =>{
    return(
        <ContenedorTicket>
            <TxtTicket bold Fsize ='24px'> {pos} </TxtTicket>
            <TxtTicket> {empleado} </TxtTicket>

            <Extra />


            <ContenedorFecha>
                <TxtTicket Fzise = '18px'> {fechaInicio} </TxtTicket>
                <TxtTicket Fzise = '18px'> - </TxtTicket>
                <TxtTicket Fzise = '18px'> {fechaFinal} </TxtTicket>
            </ContenedorFecha>

        </ContenedorTicket>
    )
}

