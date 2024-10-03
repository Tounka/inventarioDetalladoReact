import styled from "styled-components";
import html2canvas from "html2canvas"; 
import { useContext, useEffect, useRef, useState } from "react";
import { BtnModalTickets } from "./ModalEnviarTickets";
import { useEmpleados } from "../../Contextos/ContextoGeneral";
import { useCdp } from "../../Contextos/ContextoCDP";

const ContenedorTicketVenta = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #EDEBEB;
    width: 100%;
    height: auto;  
    margin: 0 auto; 
`;

const TituloCdp = styled.p`
    user-select: none;
    font-size: ${(props) => (props.size ? props.size + "px" : "12px")};
    margin: 0;
    text-align: center;

    color: white;
    font-weight: bold;
`;

const ContenedorTitulo = styled.div`
    background-color: var(--RojoPrincipal);
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    
`;

const ContenedorPrincipal = styled.div`
    background-color: #EDEBEB;
    padding: 10px;
    width: 100%;
    height: 100%;
`;

const ContenedorValues = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 10px;
    
`;

const ContenedorInformacion = styled.div`
    display: grid;
    width: 200px;
    height: 80px;
    overflow: hidden;
    border-radius: 20px;
    grid-template-rows: 1fr 1fr;
    background-color: var(--RojoPrincipal);
    border: 1px solid var(--RojoPrincipal);
    @media (max-width: 450px) {
        width: 130px;
    }
`;

const ItemInformacionStyled = styled.div`
    width: 100%;
    height: 100%;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.secundario ? "#EDEBEB" : "")};
    color: ${(props) => (props.secundario ? "var(--RojoPrincipal)" : "#EDEBEB")};
`;

const InformacionItem = ({ nombreItem = "conos", cantidadItem = "0", modificadorPrevio='', modificadorPosterior='' }) => {
    return (
        <ContenedorInformacion>
            <ItemInformacionStyled>{nombreItem}</ItemInformacionStyled>
            <ItemInformacionStyled secundario> {modificadorPrevio}{cantidadItem}{modificadorPosterior} </ItemInformacionStyled>
        </ContenedorInformacion>
    );
};
const BtnCrearImg = styled.button`
        display: flex;
        align-items: center;
        color: white;
        font-size: 16px;
        background-color: var(--RojoPrincipal);
        padding: 10px;
        border: none;
        border-radius: 30px;
`
const ContenedorBtnEspeciales = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
`

const ContenedorImgStyled = styled.div`
    width: 100%;
    
    gap: 10px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
`;

const ImagenStyled = styled.img`
    width: 100%;
    height: auto;
    object-fit: contain; 
`;
const CentradoTexto = styled.div`
    display: flex;
    justify-content: center;
`
const ContenedorCentrado = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr; 
    align-items: center; 
    gap: 10px;
    justify-items: center; 

    & > :first-child {
        justify-self: end; 
    }

    & > :last-child {
        justify-self: start; 
    }
`;


const ContenedorImg = ({ src, alt }) => {
    return(
        <ContenedorImgStyled>
            <CentradoTexto> {alt} </CentradoTexto>
            <ImagenStyled src={src} alt={alt || 'Imagen'} />
        </ContenedorImgStyled>
    );
}
const ContenedorPrincipalImgStyled = styled.div`
    width: 100%;
    gap: 10px;
    padding: 10px;
    display: flex;

    justify-content: start;
` 
const Span = styled(TituloCdp)`
    font-weight: normal;
`

export const TicketVenta = ({ cdp = "mega", setMostrarTicket, values, resetForm,setFormValues }) => {
    const {  actualizarContenidoCajas, actualizarCaja, enviarTicket, cajas } = useEmpleados();
    const {CDPSeleccionado} = useCdp()
    const [extras, setExtras] = useState({conosDobles: values.conosDobles, toppings: values.toppings});

    

    const empleado = cajas[CDPSeleccionado]?.empleado.nombre;
    console.log(empleado);

    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    const hoy = new Date();
    const diaSemana = diasSemana[hoy.getDay()];
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1; // Los meses en JavaScript van de 0 (enero) a 11 (diciembre)
    const anio = hoy.getFullYear();
    const hora = hoy.getHours();
    let minutos = hoy.getMinutes();
    if (minutos <= 9){
        minutos = '0' + minutos;
    }
    let modificadorConosDobles = 0;

    modificadorConosDobles = (Number(values.conosDobles) * 100)  / Number(values.conos);

    const fechaFormateada = `${diaSemana} - ${dia}-${mes}-${anio}- ${hora}:${minutos}`;

    // useRef para referenciar el ticket
    const ticketRef = useRef(null);

    const enviarInfo = async () => {
        const ticket = {
            pos: CDPSeleccionado,
            empleado: cajas[CDPSeleccionado].empleado.id,
            extras: extras,
            fechaInicio: cajas[CDPSeleccionado].fecha,
            fechaFinal: new Date(),
        };
            
            try {
               
                await actualizarContenidoCajas(CDPSeleccionado, '', extras);
                await actualizarCaja(CDPSeleccionado, '');
                
                enviarTicket(ticket);
                setExtras((prevExtras) => {
                    const { [CDPSeleccionado]: _, ...rest } = prevExtras;
                    return rest;
                });
                console.log(extras);
            } catch (error) {
                console.error("Error al actualizar la caja o el contenido:", error);
            }
 
    };
    // Función para generar imagen con html2canvas
    const GenerateImage = () => {
        const ticketElement = ticketRef.current;

        if (ticketElement) {
          
            ticketElement.style.width = "1200px";

            html2canvas(ticketElement, {
                scale: 2,
            }).then((canvas) => {
                const link = document.createElement("a");
                link.download = `${cdp}_${diaSemana}_${dia}_${mes}_${anio}.png`; 
                link.href = canvas.toDataURL("image/png");
                link.click();

         
                ticketElement.style.width = "100%";
            });
        }
        setMostrarTicket(false);
        resetForm();
        setFormValues();
    };
    const handleImprimir = () =>{
        enviarInfo();
        GenerateImage()
    
   

    }


    return (
        <>
            <div>
                <ContenedorTicketVenta ref={ticketRef}>
                    <ContenedorTitulo>
                    <ContenedorCentrado> <Span size="28"> {empleado} - </Span> <TituloCdp size="30">     {cdp}   </TituloCdp>  <Span size="28">- Turno {values.turno} </Span> </ContenedorCentrado>
                         
                        <TituloCdp size="14">{fechaFormateada}</TituloCdp>
                    </ContenedorTitulo>

                    <ContenedorPrincipal>
                        <ContenedorValues>
                            <InformacionItem nombreItem= 'Conos' cantidadItem= {values.conos}   />
                            <InformacionItem nombreItem= 'Conos Dobles' cantidadItem= {values.conosDobles}  modificadorPosterior={` - (${Math.floor(modificadorConosDobles)}%)`}  />
                            <InformacionItem nombreItem= 'Toppings' cantidadItem= {values.toppings}  />
                            <InformacionItem nombreItem= 'Venta' cantidadItem=  {values.venta} modificadorPrevio="$"  />
                        </ContenedorValues>
                    </ContenedorPrincipal>
                    
                    <ContenedorPrincipalImgStyled>
                        <ContenedorImg src={URL.createObjectURL(values.cierre)} alt="Imagen Cierre" />
                        <ContenedorImg src={URL.createObjectURL(values.productMix)} alt="Imagen Producto Mix" />
                        <ContenedorImg src={URL.createObjectURL(values.ticketPromedio)} alt="Imagen Ticket Promedio" />
                    </ContenedorPrincipalImgStyled>

                   </ContenedorTicketVenta>

                
            </div>
            <ContenedorBtnEspeciales>
                <BtnModalTickets onClick={() => setMostrarTicket(false)}>Regresar</BtnModalTickets>
                <BtnModalTickets onClick={() => handleImprimir()}>Imprimir</BtnModalTickets> 
            </ContenedorBtnEspeciales>
        </>
    );
};
