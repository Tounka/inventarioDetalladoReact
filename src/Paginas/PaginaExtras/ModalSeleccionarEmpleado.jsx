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
    overflow: scroll;
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
    const { listaEmpleados, modalExtras } = useEmpleados();
 
    return (
        <ContenedorModal modalExtras = {modalExtras}>
            <ContenedorCardEmpleados>
                {listaEmpleados.map((empleado) => (
                    <CardEmpleado key={empleado.id}  empleado={empleado}  />
                ))}
            </ContenedorCardEmpleados>
        </ContenedorModal>
    );
};
