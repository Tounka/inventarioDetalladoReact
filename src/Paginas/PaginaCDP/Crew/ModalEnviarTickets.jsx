import styled from "styled-components";
import { useCdp } from "../../Contextos/ContextoCDP";
import ReactDOM from 'react-dom';
import { ContenedorEnviarTicket, BtnStyled } from "../ComponentesGenerales/ComponentesGenericos";
import { useEffect, useState } from "react";
import { useEmpleados } from "../../Contextos/ContextoGeneral";
import { InputImgCrew } from "../ComponentesGenerales/InputFileImg";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TicketVenta } from './TicketsCrew'; // Importamos el componente TicketVenta

const ContenedorModalStyled = styled.div`
    display: ${(props) => (props.switchModal ? 'flex' : 'none')};
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100dvh;
    background-color: rgba(0, 0, 0, 0.28);
    justify-content: center;
    overflow-y: auto;
`;

export const BtnModalTickets = styled(BtnStyled)`
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
    flex-direction: ${props => props.horizontal ? 'row' : 'column'};
    justify-content: ${props => props.horizontal ? 'center' : ''};
    flex-wrap: wrap;
    gap: 5px;
`;

const Titulo = styled.p`
    user-select: none;
    display: flex;
    text-align: center;
    justify-content: center;
    font-size: 36px;
    font-weight: bold;
    color: white;
    padding: 10px;
    margin: -20px -20px 10px -20px;
    background-color: var(--RojoPrincipal);
`;

const InputVenta = styled(Field)`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 20px;
    text-align: center;

`;

const LabelInputVenta = styled.label`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    height: 100%;
    display: flex;

    justify-content:center;
    align-items:center;
    color: var(--RojoPrincipal);
    cursor: pointer;
`;

const ContenedorInputVenta = styled.div`
    width: 200px;
    gap: 10px;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ContenedorInput = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
`;

const validationSchema = Yup.object().shape({
    conos: Yup.number()
        .required('Este campo es obligatorio')
        .min(0, 'El número de conos debe ser al menos 0')
        .test('conos-vs-conosDobles', 'Conos no puede ser menor que Conos Dobles', function (value) {
            return value >= this.parent.conosDobles;
        }),
    conosDobles: Yup.number().required('Este campo es obligatorio').min(0, 'Debe ser mayor a 0'),
    toppings: Yup.number().required('Este campo es obligatorio').min(0, 'Debe ser mayor a 0'),
    venta: Yup.number().required('Este campo es obligatorio').min(0, 'La venta debe ser mayor a 0'),
    cierre: Yup.mixed().required('La imagen de cierre es obligatoria'),
    productMix: Yup.mixed().required('La imagen de Product Mix es obligatoria'),
    ticketPromedio: Yup.mixed().required('La imagen de Ticket Promedio es obligatoria'),
    turno: Yup.number().required('Este campo es obligatorio').min(1, 'Turno inválido'),
});

const FormTicket = styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const ModalAgregarTicket = () => {
    const modalContainer = document.querySelector("#modalAgregarTicket");
    const { modalCDPTicket, setModalCDPTicket, CDPSeleccionado } = useCdp();
    const { cajas } = useEmpleados();
    const [extras, setExtras] = useState({});
    const [mostrarTicket, setMostrarTicket] = useState(false); 
    const [formValues, setFormValues ] = useState();

    let turnoDefault = 1;

    // Obtén la hora actual
    const hora = new Date().getHours();
    
    if (hora > 17) {
        turnoDefault = 2;
    } else if (hora > 22 || hora < 6) {
        turnoDefault = 3;
    }
    const noCero = (e) => {
        const { value } = e.target;
        const newValue = value.startsWith('0') && value.length > 1 ? value.slice(1) : value;
        e.target.value = newValue;
        e.target.dispatchEvent(new Event('input', { bubbles: true }));
    };

    useEffect(() => {
        if (cajas && cajas[CDPSeleccionado] && cajas[CDPSeleccionado].extras) {
            setExtras(cajas[CDPSeleccionado].extras);
        }
    }, [CDPSeleccionado, cajas]);

    if (!modalContainer) return null;


    return ReactDOM.createPortal(
        <ContenedorModalStyled switchModal={modalCDPTicket}>
            <Formik
                initialValues={{
                    conos: 0,
                    conosDobles: extras.conosDobles || 0,
                    toppings: extras.toppings || 0,
                    venta: 0,
                    cierre: '',
                    productMix: '',
                    ticketPromedio: '',
                    turno: turnoDefault,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values)
                    setFormValues(values);
                    setMostrarTicket(true); 
                }}
            >
                {({ setFieldValue, resetForm  }) => (
                    <ContenedorEnviarTicket>
                        {!mostrarTicket ? (
                            <FormTicket>
                                <Titulo>{cajas[CDPSeleccionado]?.nombre ?? ''}</Titulo>

                                <ContenedorInputs horizontal>
                                    
                                    <ContenedorInput>
                                        <LabelInputVenta htmlFor='conos'>Conos</LabelInputVenta>
                                        <InputVenta id='conos' name='conos' type='number'  onChange={(e) => { noCero(e); setFieldValue('conos', e.target.value); }}  />
                                        <ErrorMessage name="conos" component="div" style={{ color: 'red' }} />
                                    </ContenedorInput>

                                    <ContenedorInput>
                                        <LabelInputVenta htmlFor='conosDobles'>Conos Dobles</LabelInputVenta>
                                        <InputVenta id='conosDobles' name='conosDobles' type='number'  onChange={(e) => { noCero(e); setFieldValue('conosDobles', e.target.value); }}  />
                                        <ErrorMessage name="conosDobles" component="div" style={{ color: 'red' }} />
                                    </ContenedorInput>

                                    <ContenedorInput>
                                        <LabelInputVenta htmlFor='toppings'>Toppings</LabelInputVenta>
                                        <InputVenta id='toppings' name='toppings' type='number'  onChange={(e) => { noCero(e); setFieldValue('toppings', e.target.value); }}  />
                                        <ErrorMessage name="toppings" component="div" style={{ color: 'red' }} />
                                    </ContenedorInput>

                                </ContenedorInputs>

                                <ContenedorInput>
                                    <InputImgCrew 
                                    id="cierre" 
                                    tipoImagen='Ticket Cierre' 
                                    setFieldValue={setFieldValue} 
                                    initialImage={formValues?.cierre ? URL.createObjectURL(formValues.cierre) : null} 
                                    />
                                    <ErrorMessage name="cierre" component="div" style={{ color: 'red' }} />
                                    <InputImgCrew 
                                    id="productMix" 
                                    tipoImagen='Product Mix' 
                                    setFieldValue={setFieldValue} 
                                    initialImage={formValues?.productMix ? URL.createObjectURL(formValues.productMix) : null} 
                                    />
                                    <ErrorMessage name="productMix" component="div" style={{ color: 'red' }} />
                                    <InputImgCrew 
                                    id="ticketPromedio" 
                                    tipoImagen='Ticket Promedio' 
                                    setFieldValue={setFieldValue} 
                                    initialImage={formValues?.ticketPromedio ? URL.createObjectURL(formValues.ticketPromedio) : null} 
                                    />
                                    <ErrorMessage name="ticketPromedio" component="div" style={{ color: 'red' }} />
                                </ContenedorInput>

                                <ContenedorInputs horizontal>
                                    <ContenedorInputVenta>
                                        <LabelInputVenta htmlFor='venta'>VENTA</LabelInputVenta>
                                        <InputVenta id='venta' name='venta' type='number' onChange={(e) => { noCero(e); setFieldValue('venta', e.target.value);}}  />
                                        <ErrorMessage name="venta" component="div" style={{ color: 'red' }} />
                                    </ContenedorInputVenta>
                                    
                                    <ContenedorInputVenta>
                                        <LabelInputVenta htmlFor='turno'>TURNO</LabelInputVenta>
                                        <InputVenta id='turno' name='turno' type='number' />
                                        <ErrorMessage name="turno" component="div" style={{ color: 'red' }} />
                                    </ContenedorInputVenta>
                                </ContenedorInputs>

                                <ContenedorBtns>
                                    <BtnModalTickets type="button" onClick={() => setModalCDPTicket(false)}>Cerrar</BtnModalTickets>
                                    <BtnModalTickets type="submit">Enviar</BtnModalTickets>
                                </ContenedorBtns>
                            </FormTicket>
                        ) : (
                            <>
                                <TicketVenta values = {formValues} setFormValues={setFormValues} resetForm={resetForm}  setMostrarTicket={setMostrarTicket} cdp={cajas[CDPSeleccionado]?.nombre ?? 'Desconocido'} />
                                
                            </>
                        )}
                    </ContenedorEnviarTicket>
                )}
            </Formik>
        </ContenedorModalStyled>,
        modalContainer
    );
};
