import styled from "styled-components"
export const TituloCDP = styled.h2`
    margin: 10px 20px;
    display: flex;
    justify-content: center;
    color: var(--RojoPrincipal);
    font-size: 48px;
    font-weight: bold;

`


const ContenedorMeta = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;


    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 10px;

`

const TxtMeta = styled.div`
    font-size: 24px;
    display: flex;
    justify-content: center;
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


    width: 120px;
    height: 40px;
    border: 2px solid;
    border-radius: 10px;
`;
export const ContenedorMetas = styled.div `
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 600px;
    max-width: 90%;
    height: 120px;
    gap: 20px;
`;
export const MetaExtra = ({ nombre, numero, input, setEstado }) => {
    const handleChange = (event) => {
        const newValue = event.target.value; 
    
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