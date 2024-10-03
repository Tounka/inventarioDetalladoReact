import styled from "styled-components";
import { useCdp } from "../../Contextos/ContextoCDP";
import ReactDOM from 'react-dom';
import { InputItemsVendidos } from "../ComponentesGenerales/ComponentesGenericos";
import { ContenedorEnviarTicket, BtnStyled } from "../ComponentesGenerales/ComponentesGenericos";
import { useEffect, useState } from "react";
import { useEmpleados } from "../../Contextos/ContextoGeneral";
import { InputImg } from "../ComponentesGenerales/InputFileImg";

const ContenedorModalStyled = styled.div`
    display: ${(props) => (props.switchModal ? 'flex' : 'none')};
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100dvh;
    background-color: rgba(0, 0, 0, 0.28);
    justify-content: center;
    align-items: center;
`;

const TxtModal = styled.p`

    width: 100%;
    height: 100%;
    padding: 0 20px;
    font-size: 24px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: var(--RojoPrincipal);
    @media (max-width: 350px) {
        font-size: 20px;
    }
`

const BtnModalTickets = styled(BtnStyled)`
    height: 45px;
    padding: 0;
    max-width: 100px;
`;

const ContenedorBtns = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
   
`;



export const ModalEnviarFoto = ({}) => {
    const modalContainer = document.querySelector("#modalAgregarFoto");
    const { modalCDPFotos, setModalCDPFotos, tareaCDPSeleccionada } = useCdp();
    const { cajas } = useEmpleados();

    // Inicializa 'extras' como un objeto vacío para evitar errores
    const [extras, setExtras] = useState({});

    const handleCerrar = () => {
        setModalCDPFotos(false);
    };
    const handleEnviar = () => {
        console.log(extras);
    };




    if (!modalContainer) return null;

    return ReactDOM.createPortal(
        <ContenedorModalStyled switchModal={modalCDPFotos}>
            <ContenedorEnviarTicket>
                <TxtModal>{tareaCDPSeleccionada}</TxtModal>
                <InputImg />

                <ContenedorBtns>
                    <BtnModalTickets onClick={() => handleCerrar()}>Cerrar</BtnModalTickets>
                    <BtnModalTickets onClick={() => handleEnviar()}>Enviar</BtnModalTickets>
                </ContenedorBtns>
            </ContenedorEnviarTicket>
        </ContenedorModalStyled>,
        modalContainer
    );
};
