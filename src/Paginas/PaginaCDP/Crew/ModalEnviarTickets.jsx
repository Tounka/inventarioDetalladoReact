import styled from "styled-components";
import { useCdp } from "../../Contextos/ContextoCDP";
import ReactDOM from 'react-dom';
import { ContenedorEnviarTicket, BtnStyled } from "../ComponentesGenerales/ComponentesGenericos";
import { useEffect, useState } from "react";
import { useEmpleados } from "../../Contextos/ContextoGeneral";
import { InputImgCrew } from "../ComponentesGenerales/InputFileImg";
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
    overflow-y: scroll;
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

const Titulo = styled.p`
    user-select: none;
    display: flex;
    text-align: center;
    justify-content: center;
    font-size: 36px;
    font-weight: bold;
    color: var(--RojoPrincipal);
`;

const InputVenta = styled(Field)`
    width: 100%;
    padding: 10px;
    font-size: 16px;
`;

const LabelInputVenta = styled.label`
    font-size: 24px;
    font-weight: bold;
    color: var(--RojoPrincipal);
`;

const ContenedorInputVenta = styled.div`
    width: 200px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
    conosDobles: Yup.number().required('Este campo es obligatorio'),
    toppings: Yup.number().required('Este campo es obligatorio'),
    venta: Yup.number().required('Este campo es obligatorio').min(1, 'La venta debe ser mayor a 0'),
    cierre: Yup.mixed().required('La imagen de cierre es obligatoria'),
    productMix: Yup.mixed().required('La imagen de Product Mix es obligatoria'),
    ticketPromedio: Yup.mixed().required('La imagen de Ticket Promedio es obligatoria'),
});

export const ModalAgregarTicket = () => {
    const modalContainer = document.querySelector("#modalAgregarTicket");
    const { modalCDPTicket, setModalCDPTicket, CDPSeleccionado } = useCdp();
    const { cajas } = useEmpleados();
    const [extras, setExtras] = useState({});
    
    useEffect(() => {
        if (cajas && cajas[CDPSeleccionado] && cajas[CDPSeleccionado].extras) {
            setExtras(cajas[CDPSeleccionado].extras);
        }
    }, [CDPSeleccionado, cajas]);

    if (!modalContainer) return null;

    const generateImageFromData = (data, images) => {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
    
        const ctx = canvas.getContext('2d');
    
        // Fondo
        ctx.fillStyle = '#f0f0f0'; // Light gray background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        // Estilo de borde
        ctx.strokeStyle = '#ccc'; // Light border color
        ctx.lineWidth = 5;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20); // Draw a border
    
        // Título
        ctx.fillStyle = '#2c3e50'; // Dark blue
        ctx.font = 'bold 30px Arial';
        ctx.textAlign = 'center'; // Center align text
        ctx.fillText('Ticket de Venta', canvas.width / 2, 50);
    
        // Conos Dobles y Toppings en la segunda línea
        ctx.font = 'bold 20px Arial';
    
        // Conos Dobles - Centered in left half
        ctx.fillText('Conos Dobles', canvas.width / 4, 120);
        // Toppings - Centered in right half
        ctx.fillText('Toppings', (canvas.width / 4) * 3, 120);
    
        // Cantidades centradas
        ctx.font = '16px Arial';
        ctx.fillStyle = '#34495e'; // Dark gray
        ctx.textAlign = 'center'; // Center align quantities
        ctx.fillText(data.conosDobles, canvas.width / 4, 160); // Conos Dobles cantidad
        ctx.fillText(data.toppings, (canvas.width / 4) * 3, 160); // Toppings cantidad
    
        // Venta
        ctx.fillStyle = '#e74c3c'; // Red for sale amount
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`Venta: $${data.venta}`, canvas.width / 2, 220);
    
        // Función para cargar una imagen y devolver una promesa
        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        };
    
        // Cargar todas las imágenes y luego dibujarlas en el canvas
        Promise.all(images.map(image => loadImage(image))).then(loadedImages => {
            const imageWidth = canvas.width * 0.8; // 80% del ancho del canvas
            
            let yPosition = 250; // Posición inicial para las imágenes
            let totalHeight = yPosition; // Sumar la altura total para ajustar el canvas
    
            loadedImages.forEach((img) => {
                // Calcular la altura para mantener la proporción
                const aspectRatio = img.width / img.height; // Relación de aspecto
                const imageHeight = imageWidth / aspectRatio; // Ajustar la altura manteniendo la proporción
                
                ctx.drawImage(img, (canvas.width - imageWidth) / 2, yPosition, imageWidth, imageHeight);
                yPosition += imageHeight + 20; // Espacio entre imágenes
                totalHeight += imageHeight + 20; // Incrementar la altura total
            });
    
            // Ajustar la altura del canvas para que se ajuste al contenido
            canvas.height = totalHeight + 50; // Agregar un poco de margen
    
            // Redibujar todo el contenido en el nuevo tamaño de canvas
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    
            // Volver a dibujar el contenido
            ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20); // Redraw the border
            ctx.fillStyle = '#2c3e50';
            ctx.font = 'bold 30px Arial';
            ctx.fillText('Ticket de Venta', canvas.width / 2, 50);
    
            ctx.font = 'bold 20px Arial';
            ctx.fillText('Conos Dobles', canvas.width / 4, 120);
            ctx.fillText('Toppings', (canvas.width / 4) * 3, 120);
    
            ctx.font = '16px Arial';
            ctx.fillStyle = '#34495e';
            ctx.textAlign = 'center'; // Center align quantities
            ctx.fillText(data.conosDobles, canvas.width / 4, 160);
            ctx.fillText(data.toppings, (canvas.width / 4) * 3, 160);
    
            ctx.fillStyle = '#e74c3c';
            ctx.font = 'bold 20px Arial';
            ctx.fillText(`Venta: $${data.venta}`, canvas.width / 2, 220);
    
            // Redibujar las imágenes en la nueva posición
            yPosition = 250; // Reiniciar la posición
            loadedImages.forEach((img) => {
                const aspectRatio = img.width / img.height; // Relación de aspecto
                const imageHeight = imageWidth / aspectRatio; // Ajustar la altura manteniendo la proporción
    
                ctx.drawImage(img, (canvas.width - imageWidth) / 2, yPosition, imageWidth, imageHeight);
                yPosition += imageHeight + 20; // Espacio entre imágenes
            });
    
            // Descargar la imagen
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'ticket_venta.png';
            link.click();
        }).catch(err => {
            console.error("Error al cargar las imágenes: ", err);
        });
    };
    
    
    
    
    
    

    return ReactDOM.createPortal(
        <ContenedorModalStyled switchModal={modalCDPTicket}>
            <Formik
                initialValues={{
                    conosDobles: extras.conosDobles || 0,
                    toppings: extras.toppings || 0,
                    venta: '',
                    cierre: '',
                    productMix: '',
                    ticketPromedio: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    const images = [
                        URL.createObjectURL(values.cierre),
                        URL.createObjectURL(values.productMix),
                        URL.createObjectURL(values.ticketPromedio),
                    ];

                    generateImageFromData(values, images); // Generar la imagen personalizada con los valores e imágenes
                    setModalCDPTicket(false);
                }}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <ContenedorEnviarTicket>
                            <ContenedorInputs>
                                <Titulo>{cajas[CDPSeleccionado]?.nombre ?? ''}</Titulo>

                                {/* Campos de Formik para los ítems vendidos */}
                                <div>
                                    <LabelInputVenta htmlFor='conosDobles'>Conos Dobles</LabelInputVenta>
                                    <InputVenta id='conosDobles' name='conosDobles' type='number' />
                                    <ErrorMessage name="conosDobles" component="div" style={{ color: 'red' }} />
                                </div>

                                <div>
                                    <LabelInputVenta htmlFor='toppings'>Toppings</LabelInputVenta>
                                    <InputVenta id='toppings' name='toppings' type='number' />
                                    <ErrorMessage name="toppings" component="div" style={{ color: 'red' }} />
                                </div>
                            </ContenedorInputs>

                            {/* Inputs de imágenes */}
                            <InputImgCrew
                                id="cierre"
                                tipoImagen='Ticket Cierre'
                                setFieldValue={setFieldValue}
                            />
                            <ErrorMessage name="cierre" component="div" style={{ color: 'red' }} />

                            <InputImgCrew
                                id="productMix"
                                tipoImagen='Product Mix'
                                setFieldValue={setFieldValue}
                            />
                            <ErrorMessage name="productMix" component="div" style={{ color: 'red' }} />

                            <InputImgCrew
                                id="ticketPromedio"
                                tipoImagen='Ticket Promedio'
                                setFieldValue={setFieldValue}
                            />
                            <ErrorMessage name="ticketPromedio" component="div" style={{ color: 'red' }} />

                            <ContenedorInputVenta>
                                <LabelInputVenta htmlFor='venta'>VENTA</LabelInputVenta>
                                <InputVenta id='venta' name='venta' type='number' />
                                <ErrorMessage name="venta" component="div" style={{ color: 'red' }} />
                            </ContenedorInputVenta>

                            <ContenedorBtns>
                                <BtnModalTickets type="button" onClick={() => setModalCDPTicket(false)}>Cerrar</BtnModalTickets>
                                <BtnModalTickets type="submit">Enviar</BtnModalTickets>
                            </ContenedorBtns>
                        </ContenedorEnviarTicket>
                    </Form>
                )}
            </Formik>
        </ContenedorModalStyled>,
        modalContainer
    );
};
