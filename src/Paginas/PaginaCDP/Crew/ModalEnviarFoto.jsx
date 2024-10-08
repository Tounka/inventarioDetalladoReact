import styled from "styled-components";
import { useCdp } from "../../Contextos/ContextoCDP";
import ReactDOM from 'react-dom';
import { InputItemsVendidos } from "../ComponentesGenerales/ComponentesGenericos";
import { BtnStyled } from "../ComponentesGenerales/ComponentesGenericos";
import { useEffect, useState } from "react";
import { useEmpleados } from "../../Contextos/ContextoGeneral";
//import { InputImg } from "../ComponentesGenerales/InputFileImg";
import { ItemToDoListReporte } from "../ComponentesGenerales/Tareas";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TicketReporte } from "./TicketReporte";

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
        font-size: 26px;
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
    justify-content: space-evenly;
    overflow: hidden;

    background-color: var(--BlancoPrincipal) ;
    
    gap: 10px;
    overflow-y: auto;

  
    
`
export const ModalEnviarFoto = () => {
    const modalContainer = document.querySelector("#modalAgregarFoto");
    const { modalCDPFotos, setModalCDPFotos, reporteSeleccionado } = useCdp();
    const [mostrarReporte, setMostrarReporte] = useState(false);
    const [tareasReporte, setTareasReporte] = useState(reporteSeleccionado);

    

    const handleCerrar = () => {
        setModalCDPFotos(false);
    };

    // useEffect para actualizar las tareas cuando cambie el reporteSeleccionado
        useEffect(() => {
       
                setTareasReporte(reporteSeleccionado);
          
        }, [reporteSeleccionado]);
        console.log(reporteSeleccionado)


    if (!modalContainer) return null;

    return ReactDOM.createPortal(
        <ContenedorModalStyled switchModal={modalCDPFotos}>
            <Formik
                initialValues={{
                    ...reporteSeleccionado, // Usamos el estado de tareas aquí
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    
                    setTareasReporte(values);
                    console.log(values, 'values');
                    console.log(tareasReporte)
                    setMostrarReporte(true);
                }}
                enableReinitialize // Permite que Formik reinicie los valores cuando cambian
            >
                {({ resetForm, setFieldValue }) => ( // Asegúrate de capturar setFieldValue aquí
                    <ContenedorEnviarReporte>
                        {!mostrarReporte ? (
                            <>
                                <TxtModal>Reporte {reporteSeleccionado.tipoReporte}</TxtModal>
                                <ContenedorTareasJsx>
                                {tareasReporte.tareas.map((tarea, index) => (
                                        <ItemToDoListReporte 
                                            key={reporteSeleccionado.tareas + index} 
                                            id={reporteSeleccionado.tareas + index} 
                                            index={index}
                                            txtTarea={tarea[0]} 
                                            setFieldValue={setFieldValue} // Usamos setFieldValue aquí
                                        />
                                    ))}
                                </ContenedorTareasJsx>
                                <ContenedorBtns>
                                    <BtnModalTickets type="button" onClick={handleCerrar}>Cerrar</BtnModalTickets>
                                    <BtnModalTickets type="submit">Enviar</BtnModalTickets>
                                </ContenedorBtns>
                            </>
                        ) : (
                           
                            <TicketReporte setMostrarReporte={setMostrarReporte} tareas={tareasReporte} resetForm={resetForm} />
                        )}
                    </ContenedorEnviarReporte  >
                )}
            </Formik>
        </ContenedorModalStyled>,
        modalContainer
    );
};



