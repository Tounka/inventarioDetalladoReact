import React from 'react';
import styled from 'styled-components';
import { useEmpleados } from '../ContextoGeneral';
import { ImgPicture } from '../../componentes/ImgPicture';

const CardCajaStyled = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-rows: 50px 250px 40px;
    cursor: pointer;
`;

const TxtCardCajas = styled.div`
    background-color: var(--RojoPrincipal);
    height: 100%;
    width: 100%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
`;

const ContenedorCaja = styled.div`
    height: 100%;
    width: 100%;
    font-size: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContenedorImgPicture = styled.div`
    width: 100%;
    position: relative;
    overflow: hidden;
`;

const traductor = {
    1: 'Mostrador 1',
    2: 'Mostrador 2',
    76: 'Auto',
    41: 'Centro',
    40: 'Mega',
};

export const CardCaja = ({ nombre = 'Selecciona Empleado', numeroCaja = '1', empleado = '1' }) => {
    const { setModalExtras, setCajaSeleccionada, cajas } = useEmpleados();

    // Handler para el clic en la tarjeta
    const handleClick = () => {
        setModalExtras(true);
        setCajaSeleccionada(numeroCaja);
    };

    // Determina el contenido de la tarjeta
    const caja = cajas[numeroCaja];
    const cajaNombre = caja ? caja.nombre : nombre;
    const empleadoImg = caja && caja.empleado ? caja.empleado.img : null;
    const empleadoBgColor = caja && caja.empleado ? caja.empleado.bgColor : null;

    return (
        <CardCajaStyled onClick={handleClick}>
            <TxtCardCajas>{cajaNombre}</TxtCardCajas>
            {empleadoImg ? (
                <ContenedorImgPicture>
                    <ImgPicture 
                        src={empleadoImg} 
                        color={empleadoBgColor} 
                        alt={`Imagen de ${caja.nombre}`} 
                        top 
                    />
                </ContenedorImgPicture>
            ) : (
                <ContenedorCaja>{numeroCaja}</ContenedorCaja>
            )}
            <TxtCardCajas>{traductor[numeroCaja]}</TxtCardCajas>
        </CardCajaStyled>
    );
};


