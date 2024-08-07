import styled from "styled-components";
import { useEmpleados } from "../ContextoGeneral";
import { ImgPicture } from "../../componentes/ImgPicture";
import { useState, useEffect, useRef } from "react";

const CardEmpleadoStyled = styled.div`
    width: 100%;
    height: 300px;
    background-color: ${props => props.bgColor ? props.bgColor : '#0000008f'};

    display: grid;
    grid-template-rows: 8fr 1fr;
    cursor: pointer;

    @media (max-width: 400px) {
        height: 200px;
    }
`;

const ContenedorImgCard = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
`;

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
    display: ${props => (props.modalExtras ? 'flex' : 'none')};
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
    text-align: center;
    background-color: #B41A4A;
`;

const CardEmpleado = ({ empleado }) => {
    const { setModalExtras, cajaSeleccionada, actualizarCaja, actualizarContenidoCajas, cajas } = useEmpleados();

    const nombre = empleado.nombre;
    const apodo = empleado.apodo || '';
    const img = empleado.img;
    const bgColor = empleado.bgColor;

    const validarDiferenteDia = () => {
        console.log(cajas[cajaSeleccionada].fecha);
        let date = new Date(cajas[cajaSeleccionada].fecha.seconds * 1000 + cajas[cajaSeleccionada].fecha.nanoseconds / 1000000);
        let diaDeDate = date.getDate();
        let mesDeDate = date.getMonth() + 1;

        const hoy = new Date();
        const diaDeHoy = hoy.getDate();
        const mesDeHoy = hoy.getMonth() + 1;

        return diaDeDate === diaDeHoy && mesDeDate === mesDeHoy;
    };

    const handleClick = () => {
        if (validarDiferenteDia()) {
            actualizarContenidoCajas(cajaSeleccionada, empleado, cajas[cajaSeleccionada].extras);
        } else {
            actualizarContenidoCajas(cajaSeleccionada, empleado, {});
        }
        setModalExtras(false);
        actualizarCaja(cajaSeleccionada, empleado);
    };

    return (
        <CardEmpleadoStyled onClick={() => handleClick()} bgColor={bgColor}>
            <ContenedorImgCard>
                <ImgPicture src={img} alt={'Imagen de ' + nombre} top />
            </ContenedorImgCard>
            <TxtCard>{nombre + ' ' + apodo}</TxtCard>
        </CardEmpleadoStyled>
    );
};

export const ModalEmpleados = () => {
    const { listaEmpleados, modalExtras, cajas, cajaSeleccionada } = useEmpleados();
    let selectorModal;
    if (cajas[cajaSeleccionada]) {
        selectorModal = !!cajas[cajaSeleccionada].empleado;
    }
    return (
        <ContenedorModal modalExtras={modalExtras}>
            {selectorModal ? <InternoModalExtras /> : <InternoModalSeleccionarEmpleado listaEmpleados={listaEmpleados} />}
        </ContenedorModal>
    );
};

export const InternoModalSeleccionarEmpleado = ({ listaEmpleados }) => {
    return (
        <ContenedorCardEmpleados>
            {listaEmpleados.map((empleado) => (
                <CardEmpleado key={empleado.id} empleado={empleado} />
            ))}
        </ContenedorCardEmpleados>
    );
};

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
    align-items: center;
    grid-template-columns: 1fr 7fr;
    gap: 20px;
    padding: 0 40px;

    @media (max-width: 400px) {
        grid-template-columns: 2fr 7fr;
    }
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

    @media (max-width: 350px) {
        font-size: 20px;
    }
`;

const InputExtras = ({ id, txt, agregarExtra, valueExtra = 0, minValue=0 }) => {
    const handleOnChange = (event) => {
        const value = event.target.value;
        agregarExtra(id, value);
    };

    return (
        <ContenedorInput>
            <InputCantidad min={minValue} id={id} onChange={handleOnChange} value={valueExtra} type="number" />
            <ContenedorTexto>{txt}</ContenedorTexto>
        </ContenedorInput>
    );
};

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

const BtnModalExtras = ({ submit, valoresExtras = 0, setExtras }) => {
    const { setModalExtras, actualizarContenidoCajas, actualizarCaja, cajaSeleccionada, enviarTicket, cajas } = useEmpleados();

    const ticket = {
        pos: cajaSeleccionada,
        empleado: cajas[cajaSeleccionada].empleado,
        extras: valoresExtras,
        fechaInicio: cajas[cajaSeleccionada].fecha,
        fechaFinal: new Date(),
    };

    const handleClick = () => {
        if (submit) {
            actualizarContenidoCajas(cajaSeleccionada, '', valoresExtras);
            actualizarCaja(cajaSeleccionada, '');
            setModalExtras(false);
            enviarTicket(ticket);
            setExtras((prevExtras) => {
                const { [cajaSeleccionada]: _, ...rest } = prevExtras;
                return rest;
            });
            console.log(valoresExtras);
        } else {
            setModalExtras(false);
        }
    };

    return (
        <BtnModalExtrasStyled onClick={() => handleClick()} type={submit}>
            {submit ? 'Enviar' : 'Cerrar'}
        </BtnModalExtrasStyled>
    );
};

const ContenedorBtns = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InternoModalExtras = () => {
    const { cajaSeleccionada, cajas } = useEmpleados();
    const [extras, setExtras] = useState({});
    
 
    useEffect(() => {
        setExtras(cajas[cajaSeleccionada].extras || {});
    }, [cajaSeleccionada, cajas]);

    const minValue = cajas[cajaSeleccionada].extras;
    

    const agregarExtra = (id, value) => {
        const numericValue = Number(value);
        setExtras((prevExtras) => ({
            ...prevExtras,
            [id]: numericValue,
        }));
    };
    
    const valoresExtras = extras;

    return (
        <ContenedorModalExtras>
            <TituloExtras>Extras</TituloExtras>
            <ContenedorItemsExtras>
                <InputExtras id='tocino'  txt='Tocino'  agregarExtra={agregarExtra} minValue={minValue.tocino} valueExtra={valoresExtras.tocino || ""} />
                <InputExtras id='queso' txt='Quesos' agregarExtra={agregarExtra}  minValue={minValue.queso} valueExtra={valoresExtras.queso || ""} />
                <InputExtras id='salchicha' txt='Salchicha' agregarExtra={agregarExtra} minValue={minValue.salchicha} valueExtra={valoresExtras.salchicha || ""} />
                <InputExtras id='papasGrandes' txt='Papas Grandes' agregarExtra={agregarExtra} minValue={minValue.papasGrandes} valueExtra={valoresExtras.papasGrandes || ""} />
                <InputExtras id='carne4' txt='Carne 4:1' agregarExtra={agregarExtra} minValue={minValue.carne4} valueExtra={valoresExtras.carne4 || ""} />
                <InputExtras id='carne10' txt='Carne 10:1' agregarExtra={agregarExtra} minValue={minValue.carne10} valueExtra={valoresExtras.carne10 || ""} />
                <InputExtras id='verduras' txt='Verduras' agregarExtra={agregarExtra} minValue={minValue.verduras} valueExtra={valoresExtras.verduras || ""} />
                <InputExtras id='toppings' txt='Toppings' agregarExtra={agregarExtra} minValue={minValue.toppings} valueExtra={valoresExtras.toppings || ""} />
                <InputExtras id='conosDobles' txt='Conos Dobles' agregarExtra={agregarExtra} minValue={minValue.conosDobles} valueExtra={valoresExtras.conosDobles || ""} />
            </ContenedorItemsExtras>
            <ContenedorBtns>
                <BtnModalExtras submit='submit' valoresExtras={valoresExtras} setExtras={setExtras} />
                <BtnModalExtras />
            </ContenedorBtns>
        </ContenedorModalExtras>
    );
};
