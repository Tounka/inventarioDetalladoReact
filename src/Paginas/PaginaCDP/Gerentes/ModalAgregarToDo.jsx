import { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { IoCloseOutline } from "react-icons/io5";
import { useEmpleados } from '../../ContextoGeneral';



const ContenedorModalStyled = styled.div`
    display: ${props => props.switchModal ? 'flex' : 'none'};
    position: absolute;
    left: 0;
    top: 0;
    
    width: 100%;
    height: 100dvh;
    background-color: rgba(0, 0, 0, 0.28);
    justify-content: center;
    align-items: center;
`;
const ContenedorFormulario = styled.form `
    width: 600px;
    max-width: 85%;
    height: 800px;
    max-height: 90%;

    border-radius: 20px;
    background-color: white;
    padding: 20px;
    position: relative;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    
`;

const ContenedorInputs = styled.div`
    display: flex;
    flex-direction: column;
    
    gap: 10px;
`;

const BtnCerrarModalStyled = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;

    font-size: 34px;
    color: white;
    background-color: var(--RojoPrincipal);

    font-weight: bold;
    border: none;
    border-radius:0 0 0 10px  ;
    cursor: pointer;
    
`;

const InputToDoStyled = styled.input`
    border: none;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    min-height: 40px;
    height: 100%;
  
  

`;

const LabelInputToDoStyled = styled.label`
    display: flex;
    justify-content: ${props => props.vertical ? "center" : "end" };
    align-items: center;
    color: white;
    font-size: 1.2em;
    text-shadow: 0 0 5px rgba(0,0,0,0.24);
    @media (max-width: 380px){
        justify-content: center;
    }
`;
const ContenedorInputToDoStyled = styled.div`
    display: grid;
    
    grid-template-columns: ${props => props.vertical ? "" : "1fr 3fr" } ;
    grid-template-rows: ${props => props.vertical ? "1fr 3fr" : "" } ;
   justify-content: ${props => props.center ? 'center' : ""};
    gap: 10px;
    font-size: 18px;
    font-weight: bold;

    @media (max-width: 380px){
        grid-template-columns: 1fr ;
        height: 100px;
    }
`;


const InputToDoGenerico = ({id, txt, type, vertical, propsInput, setEstado, estado }) =>{
    const handleChange = (event) =>{
        setEstado(event.target.value);
    }
    return(
        <ContenedorInputToDoStyled vertical= {vertical}  >
            <LabelInputToDoStyled htmlFor={id} vertical= {vertical}  > {txt} </LabelInputToDoStyled>
            <InputToDoStyled id={id} type={type} onChange={handleChange} value={estado} ></InputToDoStyled>
        </ContenedorInputToDoStyled>
    )
};



const  BtnSubmit = styled.button`
    width: 260px;
    height: 80px;
    border:none;

    display:flex;
    justify-content:center;
    align-items: center;

    border-radius: 25px;
    overflow: hidden;
    background-color: var(--color-verde);
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: opacity .2s ease ;
    &:hover{
        opacity: .8;
        transition: opacity .2s ease ;
    }

    @media (max-width: 380px){
        
        height: 60px;
    }

`;

const Titulo = styled.div`
     
`;




export const ModalAgregarToDo = () => {
    const {modalCDPToDo, setModalCDPToDo} = useEmpleados();
    const [txtTarea, setTxtTarea] = useState("");
    const modalContainer = document.querySelector("#modalAgregarToDoCDP");
    const handleSubmit = () =>{
        console.log('submit');
    }
    if (!modalContainer) return null;

    return ReactDOM.createPortal(
        <ContenedorModalStyled switchModal={modalCDPToDo}>
            <ContenedorFormulario onSubmit={handleSubmit}>
                <ContenedorInputs>
                
                    <BtnCerrarModalStyled onClick={() => setModalCDPToDo(false) } > <IoCloseOutline /> </BtnCerrarModalStyled>
                    <Titulo>Ingresa una Tarea</Titulo>

                    <InputToDoGenerico id='Descripción' txt = 'Descripción' type='text' setEstado = {setTxtTarea} estado = {txtTarea} />

                

                </ContenedorInputs>

                <BtnSubmit type='submit' > Agregar </BtnSubmit>
                

            </ContenedorFormulario>
        </ContenedorModalStyled>,
        modalContainer
    );
};
