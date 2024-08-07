import styled from "styled-components"


const ContenedorTicket = styled.div`
    width: 250px;
    min-height: 400px;
    height: auto;

   
    
    

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
    margin: 0 auto;
    gap: 5px;
    width: min-content;


`;

const ContenedorExtraStyled = styled.div`
    display: grid;
    grid-template-columns: 80px auto;
    

    gap: 10px;
    

`;
const TxtExtra = styled(TxtTicket)`
    background-color: #FFBC0D;
    clip-path: ${props => props.especial ? 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' : ''} ;
    padding: ${props => props.especial ? '0 20px' : '0 5px'} ;
   
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

const ContenedorInternoTickets = styled.div `
    width:100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr 3fr 1fr;
    align-items: center;
    

    padding: 0 10px;
    
`;

export const Ticket = ({pos= 'POS', empleado = 'Empleado', extras= [], fechaInicio= 0, fechaFinal= 0}) =>{
    const traductorExtras = {
        tocino: 'Tocino',
        queso: 'Quesos',
        salchicha: 'Salchicha',
        papasGrandes: 'Papas Grandes',
        carne4: 'Carne 4:1',
        carne10: 'Carne 10:1',
        verduras: 'Verduras',
        toppings: 'Toppings',
        conosDobles: 'Conos Dobles'
    };
    return(
        <ContenedorTicket>
            <ContenedorInternoTickets>
                <ContenedorVertical>
                        <TxtTicket bold Fsize ='24px'> {pos} </TxtTicket>
                        <TxtTicket> {empleado} </TxtTicket>
                    </ContenedorVertical>

                    <ContenedorExtra>
                        
                        {extras.map(extra => (
                            
                            
                            <Extra nombre={traductorExtras[extra[0]]} cantidad={extra[1]}/>
                        ))}
                        
                    </ContenedorExtra>
                    


                    <ContenedorFecha>
                        <TxtTicket Fzise = '18px'> {fechaInicio} </TxtTicket>
                        <TxtTicket Fzise = '18px'> - </TxtTicket>
                        <TxtTicket Fzise = '18px'> {fechaFinal} </TxtTicket>
                    </ContenedorFecha>


            </ContenedorInternoTickets>
            
        </ContenedorTicket>
    )
}

