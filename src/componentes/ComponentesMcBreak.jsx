import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from 'formik';
import { collection, addDoc } from 'firebase/firestore';
import imgIconosUsuarios from '../js/imgUsuarios'
import { GrNext,GrPrevious  } from "react-icons/gr";
import { useEmpleados } from "../Paginas/ContextoGeneral";
import { FaPlus } from "react-icons/fa";

const ContenedorCardMcBreak = styled.div`
    height: 300px;
    width: 175px;
    background-color: #B41A4A;
    border-radius: 30px;
    overflow: hidden;
    color: white;
    @media (max-width: 480px) {
        height: 200px;
        width: 125px;
    }

`

const P = styled.p`
    font-size: ${props => props.fuente || '30px'};
    font-weight:bold;
    text-align: center;
    margin: 5px;
    @media (max-width: 480px) {
        font-size: 18px;
        
    }
`
const Psecundario = styled(P)`
    font-size: 15px;
    
`
const ContenedorPsecundarios = styled.div`
    display: flex;
    width: 100%;
    justify-content:center;
`

const ContenedorImgCardMcBreak = styled.div`
    height: 55%;
    width: 100%;
    overflow: hidden;
`
const ImagenCardMcBreak = styled.img`
    width:100%;
    height:200%;
    object-fit:cover;
    object-position: top;
    
    
    background-color: ${props => props.color || 'blue'};
    

    
`
const ContenedorInferiorMcBreak = styled.div`
    width: 100%;
    height: 45%;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`


export function CardMcBreak({SrcImg, Nombre, Apodo, ColorDeBg, Index}){
    const [Tiempo1,  setTiempo1] = useState(0);
    const [Tiempo2,  setTiempo2] = useState(0);
    const [DiferenciaTiempo,  setDiferenciaTiempo] = useState(0);
   
    const [switchFuncion,  setSwitchFuncion] = useState(0);


    const handleClick = (switchFuncion) => {
        const opcionesFormato = {
            hour: 'numeric',
            minute: 'numeric',
            
            hour12: false, 
          };
        if(switchFuncion === 2){
            let tiempoActual = new Date();
            //let tiempoDeRegreso = Tiempo2;
            tiempoActual= tiempoActual.toLocaleTimeString('en-US', opcionesFormato);
            
            setSwitchFuncion(0)

        }else if (switchFuncion === 0){
            const tiempo = new Date();
            const tiempoDeRegreso = new Date(tiempo);
            tiempoDeRegreso.setMinutes(tiempo.getMinutes() + 30);
       
            
              setTiempo1(tiempo.toLocaleTimeString('en-US', opcionesFormato));
              setTiempo2(tiempoDeRegreso.toLocaleTimeString('en-US', opcionesFormato));

              let xSwitchFuncion = switchFuncion + 1;
              setSwitchFuncion(xSwitchFuncion)
        }else{
            setDiferenciaTiempo(revisarTiempo(Tiempo2));
            let xSwitchFuncion = switchFuncion + 1;
            setSwitchFuncion(xSwitchFuncion)
        }
  

        
    }
    const FullName = ( Nombre, Apodo ) => {
        if(Nombre && Apodo){
            return( Nombre + " " + Apodo)
        }else{
            return(Nombre + " sin apodo")
        }
    }
    const validarTiempo = (tiempoDeRegreso) =>{
        const opcionesFormato = {
            hour: 'numeric',
            minute: 'numeric',
            
            hour12: false, 
          };
        let tiempoActualF = new Date();
        tiempoActualF = tiempoActualF.toLocaleTimeString('en-US', opcionesFormato);

        if(tiempoActualF >= tiempoDeRegreso){
            return(true);
        }else{
            setSwitchFuncion(0);
        }
    }
    const revisarTiempo = (tiempoDeRegreso) => {
        
        const formatearNumeros = (numero) =>{
            let horaMinutos = numero.split(':'); 
            let hora = parseInt(horaMinutos[0], 10); 
            let minutos = parseInt(horaMinutos[1], 10); 
            let fecha = new Date();
            fecha.setHours(hora, minutos, 0, 0);

            return(fecha)
        }
        const opcionesFormato = {
            hour: 'numeric',
            minute: 'numeric',
            
            hour12: false, 
          };
        let tiempoActualF = new Date();
        tiempoActualF = tiempoActualF.toLocaleTimeString('en-US', opcionesFormato);

        if (tiempoActualF >= tiempoDeRegreso){
            
            let tiempo1Actual = formatearNumeros(tiempoActualF);
            let tiempo2Regreso = formatearNumeros(tiempoDeRegreso);
            let diferenciaMs = Math.abs(tiempo2Regreso - tiempo1Actual);
            const diferenciaMinutos = Math.floor(diferenciaMs / (1000 * 60));
            
            
            return(diferenciaMinutos);
        }
    }
    return(
        <ContenedorCardMcBreak onClick={() => handleClick(switchFuncion)}>
            <ContenedorImgCardMcBreak>
                <ImagenCardMcBreak src={SrcImg} color={ColorDeBg}  />
            </ContenedorImgCardMcBreak>
            
                <ContenedorInferiorMcBreak>

                
                {  switchFuncion  === 0 ?(
                            
                            <Psecundario>
                                <P>{FullName(Nombre, Apodo)}</P>
                            </Psecundario>
                            
                
                            
                ) : null }
                
                {  switchFuncion  === 1 ?(
                    <>
                            <P>{Nombre}</P>
                            <ContenedorPsecundarios>
                                
                                <Psecundario>{Tiempo1}</Psecundario>
                                <Psecundario>-</Psecundario>
                                <Psecundario>{Tiempo2}</Psecundario>
                            </ContenedorPsecundarios>
                    </>
            
                        ) : null }
                {switchFuncion === 2 ? (
                    validarTiempo(Tiempo2) ? (
                        
                        <>
                        {DiferenciaTiempo >= 5 ?(
                            <>
                                <P fuente= '16px'> El empleado se paso por {DiferenciaTiempo}</P>
                                
                            </>
                        ) : null}
                                
                                
                                

                        </>
                    ) : null
                ) : null}  
                
            </ContenedorInferiorMcBreak>
        </ContenedorCardMcBreak>
    );
} 

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
    display: flex;
    justify-content: center;
    align-items: center;
    
`;

const ModalContent = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    @media (max-width: 480px) {
        width: 100%;  
        justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;  
    }
`;



const ContenedorImg = styled.div`
    width: 100%;
    height: 250px;
    justify-content: space-between;
    border: solid 1px black;
    border-radius: 10px;
    display:flex;
    background-color: ${({ color }) => color};
    overflow:hidden;
    
`
const BotonColor = styled.button`
    height:20px;
    width: 20px;
    border-radius: 5px;
    background-color: ${({ color }) => color}; 
    margin-right: 5px;
`
const ContenedorFormularioRegistro = styled(Form)`
    width: 300px;
    display: flex;
    flex-direction:column;
    gap: 15px;
    @media(max-width: 480px){
        width: 100%;
    }
 
`
const colors = [
    '#112240', 
    '#EAFDF8', 
    '#984447',  
    '#468C98',  
    '#6D4C41',  
    '#3498DB',  
    '#27AE60',  
    '#F39C12',  
    '#8E44AD',  
    '#B084CC' 
];
const ImagenForm = styled.img`
    width:76%;
    height:100%;
    object-fit:cover;
    object-position: top;    

    
`
const PrevNext = styled.p`
  background-color: #000000;
  color: #fff;
  border: none;
  display:flex;
  justify-content:center;
  width:12%;
  font-size: 16px;
  margin: 0;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  user-select: none;

`;
const ContenedorInput = styled.div`
    display:flex;
    justify-content:space-between;
`
const ContenedorColores = styled.div`
    display:flex;
    justify-content:center;
`
const ContenedorVertical = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
`

const BtnSubmit = styled.button`
 border-radius: 10px;
 color: white;
 border: none;
 background-color: #B41A4A;
`
const Modal = ({ onClose }) => {
    const {db, actualizarListaEmpleados} = useEmpleados();
    
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    const [urlImg, setUrlImg] = useState(imgIconosUsuarios[0]);
    const [posicion, setPosicion] = useState(1);
    const numDeImgs = imgIconosUsuarios.length;
    

    const handleColorClick = (color) => {
        setSelectedColor(color); 
        
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".modal-formularioRegistro")) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);
    const hanldeSubmit = async(values) =>{
        
        try {
            await addDoc(collection(db, "Empleados"), { 
                nombre: values.nombre,
                apodo: values.apodo,  
                img: urlImg,
                bgColor: selectedColor
            });
            actualizarListaEmpleados();
           
            onClose(); // Cierra el modal después de agregar los datos
        } catch (error) {
            console.error("Error adding document: ", error);
        }

    }
    const handleClicSelectImg = (modo) =>{
        let newPosicion = posicion + modo;
        if (newPosicion >= numDeImgs) {
            newPosicion = 0;
        } else if (newPosicion < 0) {
            newPosicion = numDeImgs -1;
        }
        setPosicion(newPosicion);
        setUrlImg(imgIconosUsuarios[newPosicion]);
    }
    return (
        <ModalContainer>
            <ModalContent className="modal-formularioRegistro">
                
                <h2>Registro</h2>
                <Formik
                    initialValues={{ img:urlImg, bgColor:'' , nombre: '', apodo:'' }}
                    onSubmit={hanldeSubmit}
                >
                    <ContenedorFormularioRegistro >
                        <ContenedorImg color={selectedColor}>
                            <PrevNext onClick={() => handleClicSelectImg(-1)}> <GrPrevious /> </PrevNext>
                            <ImagenForm src={urlImg} />
                            <PrevNext onClick={() => handleClicSelectImg(1)}> <GrNext /> </PrevNext>
                        </ContenedorImg>
                        <ContenedorInput>
                            <label htmlFor="nombreFormulario">Nombre</label>
                            <Field type="text" name="nombre" id='nombreFormulario' />
                        </ContenedorInput>
                        <ContenedorInput>
                            <label htmlFor="apodoFormulario">Apodo / Apellido</label>
                            <Field type="text" name="apodo" id='apodoFormulario' />
                        </ContenedorInput>

                        <ContenedorVertical>
                            <ContenedorColores role="group" aria-labelledby="my-radio-group-label" >
                                
                                {colors.map(color => ( 
                                    <BotonColor
                                        key={color}
                                        color={color}
                                        type="button"
                                        onClick={() => handleColorClick(color)} 
                                        value='option'
                                    />
                                ))}

                            
                            </ContenedorColores>
                            
                            {
                                <input type="color" value={selectedColor}  onChange={(e) => handleColorClick(e.target.value)} />
                            }
                        </ContenedorVertical>
                        
                        <BtnSubmit type='submit'>
                            Enviar
                        </BtnSubmit >
                    </ContenedorFormularioRegistro>
                </Formik>
            </ModalContent>
        </ModalContainer>
    );
};
const ContenedorCardMcBreakAgregar = styled(ContenedorCardMcBreak)`
         font-size: 6rem;
    font-weight: bold;
    display: flex; 
    align-items: center;
    justify-content: center;
    cursor: pointer;
    line-height: 1; /* Ajusta el alto de línea para centrar verticalmente */
    
`
export function CardAgregar( ){
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar si el modal está abierto
    
    const {listaEmpleados} = useEmpleados();

    const toggleModal = () => {
        setModalOpen(!modalOpen); // Cambia el estado del modal
        
    };
    

    return (
        <>
            
                <ContenedorCardMcBreakAgregar onClick={toggleModal} >
                    <FaPlus />
                </ContenedorCardMcBreakAgregar>
            
            {modalOpen && <Modal onClose={toggleModal}  />} 
        </>
    );
    
}
