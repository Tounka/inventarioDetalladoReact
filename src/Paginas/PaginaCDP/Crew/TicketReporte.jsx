import styled from "styled-components";
import html2canvas from "html2canvas"; 
import { BtnModalTickets } from "./ModalEnviarTickets";
import { useEmpleados } from "../../Contextos/ContextoGeneral";
import { useCdp } from "../../Contextos/ContextoCDP";
import html2pdf from "html2pdf.js";
import { useState, useEffect } from "react";

const ContenedorTicketVenta = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #EDEBEB;
    width: 100%;
    gap: 20px;
    margin: 0 auto; 

    @media print {
        width: 100%; 
        height: auto;  
        padding: 10mm; 
        box-sizing: border-box; 
    }
`;

const TituloCdp = styled.p`
    user-select: none;
    font-size: ${(props) => (props.size ? `${props.size}px` : "12px")};
    margin: 0;
    text-align: center;
    color: ${(props) => (props.isPdf ? "red" : "white")}; 
    font-weight: bold;
    
    @media (max-width: 500px) {
        font-size: ${(props) => (props.isPrint ? `28px` : "12px")};
    }
`;

const ContenedorTitulo = styled.div`
    background-color: var(--RojoPrincipal);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
`;

const ContenedorBtnEspeciales = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
`;

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

const Span = styled(TituloCdp)`
    font-weight: normal;
    @media print {
        font-size: 28px; 
    }
`;

const ContenedorItemReporteStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 20px 0;
`;

const ContenedorImgStyled = styled.div`
    width: 100%;
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
    text-align:center;
    width:100%;
    background-color: var(--RojoPrincipal);
    color: white;
    padding: 10px;
    font-size: 20px;
    @media (max-width: 500px) {
        font-size: 12px;
    }
`;

const ItemReporte = ({ txt = 'nombreReporte', hola = 'Lunes', fileImg , img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_lMN8noBKaljHKZsqVwBsDalTQNRv4Lk76Q&s' }) => {
    const [imgURL, setImgURL] = useState(img);

    useEffect(() => {
        if (fileImg) {
            const objectURL = URL.createObjectURL(fileImg);
            setImgURL(objectURL);

            return () => URL.revokeObjectURL(objectURL);
        }
    }, [fileImg]);

    return (
        <ContenedorImgStyled>
            <CentradoTexto>{txt} - {hola}</CentradoTexto>
            <ImagenStyled src={imgURL} alt={txt} />
        </ContenedorImgStyled>
    );
};

export const TicketReporte = ({ cdp = "mega", setMostrarReporte, tareas=[], resetForm }) => {
   
    const { cajas } = useEmpleados();
    const { CDPSeleccionado, setModalCDPFotos } = useCdp();
    const [isPrint, setIsPrint] = useState(false);
    const empleado = cajas[CDPSeleccionado]?.empleado.nombre || "Empleado no encontrado";
    const { reporteSeleccionado } = useCdp();
    const hoy = new Date();
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const diaSemana = diasSemana[hoy.getDay()];
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1;
    const anio = hoy.getFullYear();
    const hora = hoy.getHours();
    const minutos = String(hoy.getMinutes()).padStart(2, '0');
    const fechaFormateada = `${diaSemana} - ${dia}-${mes}-${anio} - ${hora}:${minutos}`;

    const loadImage = (img) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = img.src;
            image.onload = resolve;
            image.onerror = reject;
        });
    };

    const handleImprimir = () => {
        const images = document.querySelectorAll("img");
        const promises = Array.from(images).map((img) => loadImage(img));

        Promise.all(promises)
            .then(() => {
                setIsPrint(true);
                resetForm();
                setModalCDPFotos(false);
            })
            .catch((error) => {
                console.error("Error al cargar imágenes: ", error);
            });
    };

    useEffect(() => {
        if (isPrint) {
            const element = document.getElementById('ticketReporte');
            const opt = {
                margin: 0,
                filename: 'reporte.pdf',
                image: { type: 'jpeg', quality: 0.85 },
                html2canvas: { scale: 3, useCORS: true }, 
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            html2pdf().from(element).set(opt).save().then(() => {
                setIsPrint(false); 
                setMostrarReporte(false);
            });
        }
    }, [isPrint, setMostrarReporte]);

    return (
        <>
            <ContenedorTicketVenta id="ticketReporte">
                <ContenedorTitulo>
                    <ContenedorCentrado>
                        <Span size="28" isPrint={isPrint}>{empleado} -</Span>
                        <TituloCdp size="30" isPrint={isPrint}>{cdp}</TituloCdp>
                        <Span size="28" isPrint={isPrint}>- {Object.keys(reporteSeleccionado)}</Span>
                    </ContenedorCentrado>
                    <TituloCdp size="14">{fechaFormateada}</TituloCdp>
                </ContenedorTitulo>

                <ContenedorItemReporteStyled>
                {tareas.tareas.map((tarea, index) => (
                    <ItemReporte key={index} txt={tarea[0]} fileImg={tarea[1]} />
                ))}
                </ContenedorItemReporteStyled>
            </ContenedorTicketVenta>

            <ContenedorBtnEspeciales>
                <BtnModalTickets onClick={() => setMostrarReporte(false)}>Regresar</BtnModalTickets>
                <BtnModalTickets onClick={handleImprimir}>Imprimir</BtnModalTickets>
            </ContenedorBtnEspeciales>
        </>
    );
};
