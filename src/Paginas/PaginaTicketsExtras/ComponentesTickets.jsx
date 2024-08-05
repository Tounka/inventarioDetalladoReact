import styled from "styled-components"


const ContenedorTicket = styled.div`
    width: 250px;
    min-height: 400px;
    height: auto;

    display: grid;
    grid-template-rows: 1fr 3fr 1fr;
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
    margin-bottom: 5px;
`;

const ContenedorFecha = styled.div`
    display: flex;
    flex-direction: row;

    width: 100%;

`;

const ContenedorExtraStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
    

    gap: 10px;
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
const ContenedorExtra= styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;
const ContenedorVertical = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Ticket = ({pos= 'POS', empleado = 'Empleado', extras= [], fechaInicio= 0, fechaFinal= 0}) =>{
    console.log(extras)
    return(
        <ContenedorTicket>
            <ContenedorVertical>
                <TxtTicket bold Fsize ='24px'> {pos} </TxtTicket>
                <TxtTicket> {empleado} </TxtTicket>
            </ContenedorVertical>

            <ContenedorExtra>
                
                {extras.map(extra => (
                    
                    
                    <Extra nombre={extra[0]} cantidad={extra[1]}/>
                ))}
                
            </ContenedorExtra>
            


            <ContenedorFecha>
                <TxtTicket Fzise = '18px'> {fechaInicio} </TxtTicket>
                <TxtTicket Fzise = '18px'> - </TxtTicket>
                <TxtTicket Fzise = '18px'> {fechaFinal} </TxtTicket>
            </ContenedorFecha>

        </ContenedorTicket>
    )
}

