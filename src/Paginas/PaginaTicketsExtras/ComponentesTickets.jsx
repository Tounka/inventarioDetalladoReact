import styled from "styled-components"
import { ImgPicture } from "../../componentes/ImgPicture";

const ContenedorTicket = styled.div`
    width: 250px;
    min-height: 400px;
    height: auto;
    
   @media (max-width: 550px) {
        width: 175px;
   }
   @media (max-width: 375px) {
        width: 250px;
   }
    

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
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: ${props => props.Fsize ? props.Fsize : '18px'};
    font-weight: ${props => props.bold ? 'bold' : ''};
    margin-bottom: 5px;

    @media (max-width: 550px) {
        font-size: ${props => props.small ? '16px'  : '16px'};
   }

   background-color: ${props => props.color ? '#B41A4A'  : ''} ;
   color: ${props => props.color ? 'white'  : ''} ;
   font-size: bold;
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
    align-items:center;
    @media (max-width: 550px) {
        grid-template-columns: 60px auto;
   }

    gap: 10px;
    

`;
const TxtExtra = styled(TxtTicket)`
    background-color: #FFBC0D;
    clip-path: ${props => props.especial ? 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' : ''} ;
    height: ${props => props.especial ? '24px' : ''} ;
    
    padding: ${props => props.especial ? '0 20px' : '0 5px'} ;
    margin-bottom: 0;
   
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
    gap: 10px;
`;
const ContenedorVertical = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const ContenedorInternoTickets = styled.div `
    width:100%;
    height: 100%;
    display: grid;
    grid-template-rows: 150px auto 30px;
    align-items: center;
    gap: 10px;

    padding: 0 10px;
    
`;
const ContenedorImgExtras = styled.div`
    position: relative;
    width: 100%;
    max-width: 175px;
    height: 110px;
    display:flex;
    overflow: hidden;
    align-items: baseline;
`;
export const Ticket = ({pos= 'POS', empleado = 'Empleado', src,color , extras= [], fechaInicio= 0, fechaFinal= 0}) =>{
    const traductorExtras = {
        tocino: 'Tocino',
        queso: 'Quesos',
        salchicha: 'Salchicha',
        papasGrandes: 'Papas G.',
        carne4: '4:1',
        carne10: '10:1',
        verduras: 'Verduras',
        toppings: 'Toppings',
        conosDobles: 'Conos D.'
    };
    return(
        <ContenedorTicket>
            <ContenedorInternoTickets>
                <ContenedorVertical>
                        <TxtTicket bold Fsize ='24px'> {pos} </TxtTicket>

                        <ContenedorImgExtras>
                            <ImgPicture bg color={color} src={src} top paddingTop = '10px' />
                            <TxtTicket topName color > {empleado} </TxtTicket>
                        </ContenedorImgExtras>
                        
                    </ContenedorVertical>

                    <ContenedorExtra>
                        
                        {extras.map(extra => (
                            
                            
                            <Extra nombre={traductorExtras[extra[0]]} cantidad={extra[1]}/>
                        ))}
                        
                    </ContenedorExtra>
                    


                    <ContenedorFecha>
                        <TxtTicket Fzise = '18px' small > {fechaInicio} </TxtTicket>
                        <TxtTicket Fzise = '18px' small > - </TxtTicket>
                        <TxtTicket Fzise = '18px' small > {fechaFinal} </TxtTicket>
                    </ContenedorFecha>


            </ContenedorInternoTickets>
            
        </ContenedorTicket>
    )
}

