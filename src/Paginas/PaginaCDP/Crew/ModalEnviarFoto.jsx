import styled from "styled-components";
import { useCdp } from "../../Contextos/ContextoCDP";
import ReactDOM from 'react-dom';
import { InputItemsVendidos } from "../ComponentesGenerales/ComponentesGenericos";
import { BtnStyled } from "../ComponentesGenerales/ComponentesGenericos";
import { useEffect, useState } from "react";
import { useEmpleados } from "../../Contextos/ContextoGeneral";
//import { InputImg } from "../ComponentesGenerales/InputFileImg";
import { ItemToDoList } from "../ComponentesGenerales/Tareas";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
    
    padding: 0 20px;
    font-size: 36px;
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

const reportes = {
    inicial: {
        tareas: [
            "Verificar POS online, tomar foto de la apertura de caja.",
            "Verificar Combo (temperatura y OverRun).",
            "Revisar y registrar desperdicio, desechar productos caducados.",
            "Actualizar tiempos de vida",
            "Pisos",
            "Limpieza general (superficies y pisos y mantener el área organizada)."
        ]
    },
    intermedio: {
        tareas: [
            "Limpiar pisos",
            "Limpiar paredes - vinilos" ,
            "Contornos de combo sin base seca, toppings o suciedad.",
            "Limpiar empaques de refrigerador.",
            "Organizar repisas - muebles.",
            "Parte superior de refrigerador sin equipo.",
        ]
    },
    final: {
        tareas: [
            "Pisos.",
            "Paredes.",
            "Combo.",
            "Limpieza general (superficies y pisos y mantener el área organizada)."
        ]
    }
};
const ContenedorTareasJsx = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    justify-content: center;
    align-items: center;

`
const validationSchema = Yup.object().shape({

    

});

export const ContenedorEnviarReporte = styled(Form)`
    
    min-height: 600px;
    width: 100%;
    max-width: 800px;
    height: 100%;
  
    padding: 10px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;

    background-color: var(--BlancoPrincipal) ;
    
    gap: 10px;
    overflow-y: auto;

    @media (max-width: 360px){
        width: 90%;
    }
    
`
export const ModalEnviarFoto = () => {
    const modalContainer = document.querySelector("#modalAgregarFoto");
    const { modalCDPFotos, setModalCDPFotos, reporteSeleccionado } = useCdp();

    const handleCerrar = () => {
        setModalCDPFotos(false);
    };

    if (!modalContainer) return null;

    return ReactDOM.createPortal(
        <ContenedorModalStyled switchModal={modalCDPFotos}>
            <Formik
                initialValues={{
                    tareas: [], // Adjust as necessary
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    
                    resetForm();
                }}
            >
                {({ resetForm }) => (
                    <ContenedorEnviarReporte>
                        <TxtModal>Reporte {reporteSeleccionado}</TxtModal>
                        <ContenedorTareasJsx>
                            {reportes[reporteSeleccionado]?.tareas.map((tarea, index) => (
                                <ItemToDoList key={index} txtTarea={tarea} />
                            ))}
                        </ContenedorTareasJsx>
                        <ContenedorBtns>
                            <BtnModalTickets type="button" onClick={handleCerrar}>Cerrar</BtnModalTickets>
                            <BtnModalTickets type="submit">Enviar</BtnModalTickets>
                        </ContenedorBtns>
                    </ContenedorEnviarReporte>
                )}
            </Formik>
        </ContenedorModalStyled>,
        modalContainer
    );
};

