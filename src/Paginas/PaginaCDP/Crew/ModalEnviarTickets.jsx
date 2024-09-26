import styled from "styled-components";
import { useCdp } from "../../Contextos/ContextoCDP";
import ReactDOM from 'react-dom';
import { InputItemsVendidos } from "../ComponentesGenerales/ComponentesGenericos";
import { ContenedorEnviarTicket, BtnStyled } from "../ComponentesGenerales/ComponentesGenericos";
import { useEffect, useState } from "react";
import { useEmpleados } from "../../Contextos/ContextoGeneral";

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

const BtnModalTickets = styled(BtnStyled)`
    height: 60px;
    max-width: 100px;
`;

const ContenedorBtns = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`;

const ContenedorInputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const ModalAgregarTicket = () => {
    const modalContainer = document.querySelector("#modalAgregarTicket");
    const { modalCDPTicket, setModalCDPTicket, CDPSeleccionado } = useCdp();
    const { cajas } = useEmpleados();

    // Inicializa 'extras' como un objeto vacío para evitar errores
    const [extras, setExtras] = useState({});

    const handleCerrar = () => {
        setModalCDPTicket(false);
    };
    const handleEnviar = () => {
        console.log(extras);
    };

    // Actualiza 'extras' solo cuando cajas[CDPSeleccionado] esté disponible
    useEffect(() => {
        if (cajas && cajas[CDPSeleccionado] && cajas[CDPSeleccionado].extras) {
            setExtras(cajas[CDPSeleccionado].extras);
        }
    }, [CDPSeleccionado, cajas]);

    const agregarExtra = (id, value) => {
        const numericValue = Number(value);
        setExtras((prevExtras) => ({
            ...prevExtras,
            [id]: numericValue,
        }));
    };

    if (!modalContainer) return null;

    return ReactDOM.createPortal(
        <ContenedorModalStyled switchModal={modalCDPTicket}>
            <ContenedorEnviarTicket>
                <ContenedorInputs>
                    <InputItemsVendidos
                        valueExtra={extras.conosDobles || ""}
                        agregarExtra={agregarExtra}
                        id='conosDobles'
                        txt='Conos Dobles'
                    />
                    <InputItemsVendidos
                        valueExtra={extras.toppings || ""}
                        agregarExtra={agregarExtra}
                        id='toppings'
                        txt='Toppings'
                    />
                </ContenedorInputs>

                <ContenedorBtns>
                    <BtnModalTickets onClick={() => handleCerrar()}>Cerrar</BtnModalTickets>
                    <BtnModalTickets onClick={() => handleEnviar()}>Enviar</BtnModalTickets>
                </ContenedorBtns>
            </ContenedorEnviarTicket>
        </ContenedorModalStyled>,
        modalContainer
    );
};
