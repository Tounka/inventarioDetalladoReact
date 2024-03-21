import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import imgIconosUsuarios from '../js/imgUsuarios'
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
    font-size: 30px;
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

export function CardMcBreak({SrcImg, Nombre, Apodo, ColorDeBg, Index}){
    const [Tiempo1,  setTiempo1] = useState(0);
    const [Tiempo2,  setTiempo2] = useState(0);
    const [Text,  setText] = useState('');
    const [switchFuncion,  setSwitchFuncion] = useState(false);


    const handleClick = (switchFuncion) => {
        const opcionesFormato = {
            hour: 'numeric',
            minute: 'numeric',
            
            hour12: false, 
          };
        if(switchFuncion){
            let tiempoActual = new Date();
            let tiempoDeRegreso = Tiempo2;
            tiempoActual= tiempoActual.toLocaleTimeString('en-US', opcionesFormato);
            
            setText(tiempoDeRegreso + '/' + tiempoActual);

        }else{
            const tiempo = new Date();
            const tiempoDeRegreso = new Date(tiempo);
            tiempoDeRegreso.setMinutes(tiempo.getMinutes() + 30);
       
            
              setTiempo1(tiempo.toLocaleTimeString('en-US', opcionesFormato));
              setTiempo2(tiempoDeRegreso.toLocaleTimeString('en-US', opcionesFormato));
        }
       setSwitchFuncion(!switchFuncion);

        
    }
    const FullName = ( Nombre, Apodo ) => {
        if(Nombre && Apodo){
            return( Nombre + " " + Apodo)
        }else{
            return(Nombre + " sin apodo")
        }
    }
    return(
        <ContenedorCardMcBreak onClick={() => handleClick(switchFuncion)}>
            <ContenedorImgCardMcBreak>
                <ImagenCardMcBreak src={SrcImg} color={ColorDeBg}  />
            </ContenedorImgCardMcBreak>
            
        
            {
                     switchFuncion  ? (
                        <ContenedorPsecundarios>
                            <Psecundario>{Tiempo1}</Psecundario>
                            <Psecundario>-</Psecundario>
                            <Psecundario>{Tiempo2}</Psecundario>
                        </ContenedorPsecundarios>
                    ) : (
                        <Psecundario>
                             <P>{FullName(Nombre, Apodo)}</P>
                        </Psecundario>
                    )
            }
            
            

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

const CloseButton = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`;

const ContenedorImg = styled.div`
    width: 100%;
    height: 250px;
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
    '#F1C40F',  
    '#B084CC'  
];
const ImagenForm = styled.img`
    width:100%;
    height:100%;
    object-fit:cover;
    object-position: top;    

    
`
const PrevNext = styled.p`
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  margin: 0;
  display:flex;
  justify-content:center;
  align-items:center;
  cursor: pointer;
  transition: background-color 0.3s ease;

`;
const Modal = ({ onClose, db }) => {
    
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
            console.log("Document written with ID: ",  );
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
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <h2>Registro</h2>
                <Formik
                    initialValues={{ img:urlImg, bgColor:'' , nombre: '', apodo:'' }}
                    onSubmit={hanldeSubmit}
                >
                    <ContenedorFormularioRegistro >
                        <ContenedorImg color={selectedColor}>
                            <PrevNext onClick={() => handleClicSelectImg(-1)}> S </PrevNext>
                            <ImagenForm src={urlImg} />
                            <PrevNext onClick={() => handleClicSelectImg(1)}> N </PrevNext>
                        </ContenedorImg>
                        <div>
                            <label htmlFor="nombreFormulario">Nombre</label>
                            <Field type="text" name="nombre" id='nombreFormulario' />
                        </div>
                        <div>
                            <label htmlFor="apodoFormulario">Apodo / Apellido</label>
                            <Field type="text" name="apodo" id='apodoFormulario' />
                        </div>

                        <div role="group" aria-labelledby="my-radio-group-label">
                            
                            {colors.map(color => ( 
                                <BotonColor
                                    key={color}
                                    color={color}
                                    type="button"
                                    onClick={() => handleColorClick(color)} 
                                    value='option'
                                />
                            ))}

                            {
                                //<input type="color" value={'#cc99ff'} /> 
                            }
                        </div>
                        <button type='submit'>
                            Enviar
                        </button >
                    </ContenedorFormularioRegistro>
                </Formik>
            </ModalContent>
        </ModalContainer>
    );
};
const ContenedorCardMcBreakAgregar = styled(ContenedorCardMcBreak)`
        font-size: 8rem;
        font-weight:bold;
        display:flex; 
        align-items: center;
        justify-content:center;
        cursor: pointer;
    
`
export function CardAgregar( {db, setListaEmpleados}){
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar si el modal está abierto
    
    const obtenerDatos = async () => {
        try {
            const consulta = collection(db, 'Empleados');
            const listaEmpleadosSnapshot = await getDocs(consulta);

            if (listaEmpleadosSnapshot.docs.length > 0) {
                let lista = listaEmpleadosSnapshot.docs.map(documento => documento.data());
                setListaEmpleados(lista);
            
            } else {
                console.log('No se encontraron documentos');
            }
        } catch (error) {
            console.error('Error al obtener documentos:', error.message);
        }
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen); // Cambia el estado del modal
        obtenerDatos();
    };
    

    return (
        <>
            
                <ContenedorCardMcBreakAgregar onClick={toggleModal} >
                    +
                </ContenedorCardMcBreakAgregar>
            
            {modalOpen && <Modal onClose={toggleModal} db={db} />} 
        </>
    );
    
}
