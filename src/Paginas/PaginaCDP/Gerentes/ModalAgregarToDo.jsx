import { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { IoCloseOutline } from "react-icons/io5";
import { useEmpleados } from '../../Contextos/ContextoGeneral';
import { useCdp } from '../../Contextos/ContextoCDP';



const ContenedorModalStyled = styled.div`
    display: ${props => props.switchModal ? 'flex' : 'none'};
    position: fixed;
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
    height: 400px;
    max-height: 90%;

    border-radius: 20px;
    background-color: var(--AzulPrincipal);
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
        height: 80px;
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
    width: 240px;
    height: 60px;
    border:none;

    display:flex;
    justify-content:center;
    align-items: center;

    border-radius: 25px;
    overflow: hidden;
    background-color: var(--AmarilloPrincipal);
    color: var(--AzulPrincipal);
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
     color: white;
     display: flex;
     justify-content: center;
     align-items: center;

     font-size: 36px;
     font-weight: bold;
     width: 100%;
     height: 80px;

     
`;



const ContenedorSwitchStyled = styled.div `
    display: grid;
    grid-template-columns: ${props => props.bool ? "1fr 2fr" : "2fr 1fr"};
    transition: .2s ease;
    width: 100%;
    height: 80px;
    position: relative;

    justify-content:center;
    align-items: center;

    border-radius: 25px;
    overflow: hidden;


`;

const ButtonSwitch = styled.button`
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
    background-color: ${props => props.bg ? props.bg : ''};
    font-size: 24px;
    color: white;
    cursor: pointer;

    transition: transform .2s ease;
  
`;

const InputToDoSelectorBool = ({ vertical, bool, setBoolTarea}) =>{
    const handleClick = (valor) =>{
        setBoolTarea(valor);
    }
    return(
        <ContenedorInputToDoStyled vertical= {vertical}  >
            <LabelInputToDoStyled vertical= {vertical} > Tipo de tarea </LabelInputToDoStyled>
                <ContenedorSwitchStyled bool = {bool} >
                    <ButtonSwitch type='button' bg= "var(--RojoPrincipal)" onClick={() => handleClick(0)} > Fija </ButtonSwitch >
                    
                    <ButtonSwitch type='button' bg= "#296965" onClick={() => handleClick(1)} > Especial </ButtonSwitch >
                </ContenedorSwitchStyled>
        </ContenedorInputToDoStyled>
    )
};





export const ModalAgregarToDo = () => {
    const {modalCDPToDo, setModalCDPToDo, CrearDocumento, crearDocCdp, setCrearDocCdp, CDPSeleccionado} = useCdp();
    const [txtTarea, setTxtTarea] = useState("");
    const modalContainer = document.querySelector("#modalAgregarToDoCDP");

    const [tipoDeTarea, setTipoDeTarea] = useState(0);

    const handleSubmit = (event) => {
        let tarea;
        if(tipoDeTarea){
             tarea = 'especiales';
        }else{
             tarea = 'fijas';
        }
        event.preventDefault();
        
        
        if (crearDocCdp) {
            CrearDocumento(tarea, "Tareas", { tarea: txtTarea });
            setCrearDocCdp(false);
            setModalCDPToDo(false);
            setTxtTarea(""); 
        }
    };
    
    const handleBtnCerrar = () =>{
 

            setCrearDocCdp(false);
            setModalCDPToDo(false)
      
    }
    if (!modalContainer) return null;

    return ReactDOM.createPortal(
        <ContenedorModalStyled switchModal={modalCDPToDo}>
            <ContenedorFormulario onSubmit={handleSubmit}>
                <ContenedorInputs>
                
                    <BtnCerrarModalStyled type="button" onClick={() => handleBtnCerrar() } > <IoCloseOutline /> </BtnCerrarModalStyled>
                    <Titulo>Ingresa una Tarea</Titulo>

                    <InputToDoGenerico id='Descripción' txt = 'Descripción' type='text' setEstado = {setTxtTarea} estado = {txtTarea} />

                    <InputToDoSelectorBool vertical={"vertical"}  bool = {tipoDeTarea} setBoolTarea = {setTipoDeTarea} />
                </ContenedorInputs>

                <BtnSubmit type='submit' > Agregar </BtnSubmit>
                

            </ContenedorFormulario>
        </ContenedorModalStyled>,
        modalContainer
    );
};
