import styled from "styled-components"
import { useCdp } from "../../Contextos/ContextoCDP";
export const TituloCDP = styled.h2`
    margin: 10px 20px;
    display: flex;
    justify-content: center;
    color: var(--RojoPrincipal);
    font-size: ${props => props.small ? '28px' : '48px'};
    font-weight: bold;

`


const ContenedorMeta = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;


    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 10px;

`

const TxtMeta = styled.div`
    font-size: 24px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;
const  NumeroMeta = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;


    width: 120px;
    height: 40px;
    border: 2px solid;
    border-radius: 10px;
`;

const  NumeroMetaInput = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;


    width: 100%;
    height: 40px;
    border: 2px solid;
    border-radius: 10px;
`;
export const ContenedorMetas = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 600px;
    max-width: 90%;
    
    min-height: 100px;
    gap: 20px;
`;
export const MetaExtra = ({ nombre, numero, input, setEstado, cajaSeleccionada  }) => {
    const {setCDPSeleccionado} = useCdp();
    const handleChange = (event) => {

        const newValue = event.target.value; 
        setCDPSeleccionado(cajaSeleccionada);
        console.log(newValue);
        setEstado(newValue); 
    }

    return (
        <>
            {input ? (
                <ContenedorMeta>
                    <TxtMeta>{nombre}</TxtMeta>
                    <NumeroMetaInput 
                        onChange={handleChange}  
                        type='number' 
                        min='0' 
                        value={numero}          
                    />
                </ContenedorMeta>
            ) : (
                <ContenedorMeta>
                    <TxtMeta>{nombre}</TxtMeta>
                    <NumeroMeta>{numero}</NumeroMeta>
                </ContenedorMeta>
            )}
        </>
    );
};


export const BtnStyled = styled.button`
    min-width: 120px;
    height: 80px;
    padding: 20px;
    border-radius: 20px;
    border: none;
    background-color: var(--RojoPrincipal);

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 24px;
    color: white;
    cursor:pointer;

`;

export const ContenedorEnviarTicket = styled.div`
    min-height: 600px;
    width: 80%;
    max-width: 800px;
    height: fit-content;
    padding: 20px;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;

    background-color: var(--BlancoPrincipal) ;
    border-radius: 20px;
    gap: 10px;

    @media (max-width: 360px){
        width: 90%;
    }
    
`



const ContenedorInput = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 7fr;
    gap: 20px;
    
    border-radius: 10px;
    overflow: hidden;
    
    @media (max-width: 400px) {
        grid-template-columns: 2fr 7fr;
    }
`;

export const ContenedorTexto = styled.label`
    background-color: var(--RojoPrincipal);
    width: 100%;
    height: 100%;
    padding: 0 20px;
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    color: var(--BlancoPrincipal);
    @media (max-width: 350px) {
        font-size: 20px;
    }
`;
const InputCantidad = styled.input`
    height: 50px;
    text-align: center;
    background-color: var(--RojoPrincipal);
    color: var(--BlancoPrincipal);
    width: 100%;
    border-radius: 10px 0 0 10px ;
    border: none;
`;
export const InputItemsVendidos = ({ id, txt, agregarExtra, valueExtra = 0, minValue=0 }) => {
    const handleOnChange = (event) => {
        const value = event.target.value;
        agregarExtra(id, value);
    };

    return (
        <ContenedorInput>
            <InputCantidad min={minValue} id={id} onChange={handleOnChange} value={valueExtra} type="number" />
            <ContenedorTexto htmlFor={id} >{txt}</ContenedorTexto>
        </ContenedorInput>
    );
};