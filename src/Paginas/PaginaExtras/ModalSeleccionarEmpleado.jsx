import styled from "styled-components";
import { useEmpleados } from "../ContextoGeneral"; //
import { ImgPicture } from "../../componentes/ImgPicture"; //
import { useState } from "react";

const CardEmpleadoStyled = styled.div`
    width: 100%;
    height: 300px;
    display: grid;
    grid-template-rows: 8fr 1fr;
    cursor: pointer;
`;
const ContenedorImgCard = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

`
const ContenedorCardEmpleados = styled.div`
    width: 90%;
    max-width: 900px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    height: fit-content;
    margin: 20px 0;

   
    
`;

const ContenedorModal = styled.div`
    width: 100%;
    height: 100%;
    background-color: #00000083;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    display: ${props => (props.modalExtras ? 'flex' : 'none')}; /* Asegúrate de manejar bien el estado de display */
    overflow: auto;
    
`;

const TxtCard = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: white;
    font-weight: bold;
`;

const CardEmpleado = ({ empleado }) => {
    const { setModalExtras, cajaSeleccionada, actualizarCaja, actualizarContenidoCajas } = useEmpleados();
  
    const nombre = empleado.nombre;
    const img    =empleado.img;
   
    const handleClick = () =>{
        setModalExtras(false);
        
        actualizarCaja(cajaSeleccionada, empleado);
        actualizarContenidoCajas(cajaSeleccionada, empleado );

    }
    return (
        <CardEmpleadoStyled onClick={() =>handleClick() }>
            <ContenedorImgCard>
                <ImgPicture src={img} alt={'Imagen de ' + nombre} top />
            </ContenedorImgCard>
            
            <TxtCard>{nombre}</TxtCard>
        </CardEmpleadoStyled>
    );
};

export const ModalEmpleados = () => {
    const { listaEmpleados, modalExtras, cajas, cajaSeleccionada } = useEmpleados();
    
    return (
        <ContenedorModal modalExtras = {modalExtras}>
            {cajas[cajaSeleccionada]  ?
                <InternoModalExtras />
                :
                <InternoModalSeleccionarEmpleado listaEmpleados={listaEmpleados} />
            }
            
            
        </ContenedorModal>
    );
};
//<InternoModalSeleccionarEmpleado listaEmpleados={listaEmpleados} />
export const InternoModalSeleccionarEmpleado = ({listaEmpleados}) => {

    return(
        <ContenedorCardEmpleados>
            {listaEmpleados.map((empleado) => (
                
                <CardEmpleado key={empleado.id}  empleado={empleado}  />
            ))}
        </ContenedorCardEmpleados>
    );
}

const ContenedorModalExtras = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 90%;
    max-width: 900px;
    padding: 10px;
    gap: 10px;
    background-color: #B6D2C2;
`;
const ContenedorItemsExtras = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

`;
const TituloExtras = styled.p`
    user-select: none;
    font-size: 34px;
    font-weight: bold;
    color: #FDF2EB;
    text-align: center;
`;

const InputCantidad = styled.input`
    height: 50px;
    width: 100%;
    border: none;

`;

const ContenedorInput = styled.div`
    display: grid;
    grid-template-columns: 1fr 7fr;
    gap: 20px;
    padding: 0 40px;
    
   
`;

const ContenedorTexto = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;

    padding: 0 20px;
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
`;
const InputExtras = ({id, txt, agregarExtra }) => {
    const handleOnChange = (event) => {
        const value = event.target.value;  
        agregarExtra(id, value);

    };
    return(
        <ContenedorInput>
            <InputCantidad id={id} onChange={handleOnChange}/>
            <ContenedorTexto > {txt} </ContenedorTexto>
        </ContenedorInput>
    );
}

const BtnModalExtrasStyled = styled.button`
    
    width: ${props => props.type === 'submit' ? '200px' : '150px'};
    height: ${props => props.type === 'submit' ? '60px' : '40px'};
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: ${props => props.type === 'submit' ? 'green' : 'brown'};
    border: none;
    border-radius: 10px;
    font-size: 24px;
`;

const BtnModalExtras = ({submit}) => {
    const { setModalExtras, actualizarContenidoCajas, actualizarCaja, cajaSeleccionada} = useEmpleados();
    const handleClick = () =>{
        if(submit){
            actualizarContenidoCajas(cajaSeleccionada, '');
            actualizarCaja(cajaSeleccionada, '');
            setModalExtras(false);
        }else{
            setModalExtras(false);
        }
       

    }
    return(
        <BtnModalExtrasStyled onClick={() => handleClick()} type ={submit}>
            {submit ? 'Enviar' : 'Cerrar'}
            
        </BtnModalExtrasStyled>
    );
}
const InternoModalExtras = () => {
    const {cajaSeleccionada} = useEmpleados();
    const [extras, setExtras] = useState({});

    const agregarExtra = (id, value) => {
        setExtras((prevExtras) => ({
            ...prevExtras,
            [cajaSeleccionada]: {
                ...(prevExtras[cajaSeleccionada] || {}),
                [id]: value
            }
        }));
        console.log(extras);
    };
    return( 
            <ContenedorModalExtras>
                <TituloExtras> Extras </TituloExtras>

                <ContenedorItemsExtras>
                    <InputExtras id='tocino'  txt= 'Tocino'  agregarExtra={agregarExtra}   />
                    <InputExtras id='queso'  txt= 'Queso' agregarExtra={agregarExtra}  />
                    <InputExtras id='papasGrandes'  txt= 'Papas Grandes' agregarExtra={agregarExtra}  />
                    <InputExtras id='salchicha'  txt= 'Salchicha' agregarExtra={agregarExtra}  />
                    <InputExtras id='carne4-1'  txt= 'Carne 4:1' agregarExtra={agregarExtra}  />
                    <InputExtras id='carne10-1'  txt= 'Carne 10:1' agregarExtra={agregarExtra}  />
                    <InputExtras id='verduras'  txt= 'Verduras' agregarExtra={agregarExtra}  />
                    <InputExtras id='toppings'  txt= 'Toppings' agregarExtra={agregarExtra}  />

                </ContenedorItemsExtras>

                <BtnModalExtras submit = 'submit'  />
                <BtnModalExtras />
            </ContenedorModalExtras>

    );
}