import styled from "styled-components";
import { useEmpleados } from "../ContextoGeneral"; // Asegúrate de que la ruta sea correcta
import { ImgPicture } from "../../componentes/ImgPicture"; // Asegúrate de que la ruta sea correcta

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
    const { setModalExtras, cajaSeleccionada, actualizarCaja } = useEmpleados();
    const nombre = empleado.nombre;
    const img    =empleado.img;
   
    const handleClick = () =>{
        setModalExtras(false);
        actualizarCaja(cajaSeleccionada, empleado);
       

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
            {cajas[cajaSeleccionada] ?
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
    gap: 20px;

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
const InputExtras = ({id, txt, }) => {
    return(
        <ContenedorInput>
            <InputCantidad id={id}/>
            <ContenedorTexto> {txt} </ContenedorTexto>
        </ContenedorInput>
    );
}

const BtnModalExtrasStyled = styled.button`
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: brown;
    border: none;
    border-radius: 10px;
    font-size: 24px;
`;

const BtnModalExtras = () => {
    const { setModalExtras} = useEmpleados();
    const handleClick = () =>{
        setModalExtras(false);

    }
    return(
        <BtnModalExtrasStyled onClick={() => handleClick()}>
            Cerrar
        </BtnModalExtrasStyled>
    );
}
const InternoModalExtras = () => {
    return( 
            <ContenedorModalExtras>
                <TituloExtras> Extras </TituloExtras>

                <ContenedorItemsExtras>
                    <InputExtras id='tocino'  txt= 'Tocino'/>
                    <InputExtras id='queso'  txt= 'Queso'/>
                    <InputExtras id='papasGrandes'  txt= 'Papas Grandes'/>
                    <InputExtras id='salchicha'  txt= 'Salchicha'/>
                    <InputExtras id='carne4-1'  txt= 'Carne 4:1'/>
                    <InputExtras id='carne10-1'  txt= 'Carne 10:1'/>
                    <InputExtras id='verduras'  txt= 'Verduras'/>
                    <InputExtras id='toppings'  txt= 'Toppings'/>

                </ContenedorItemsExtras>

                <BtnModalExtras />
            </ContenedorModalExtras>

    );
}