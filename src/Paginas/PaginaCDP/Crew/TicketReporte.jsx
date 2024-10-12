import styled from "styled-components";
import html2canvas from "html2canvas"; 
import { BtnModalTickets } from "./ModalEnviarTickets";
import { useEmpleados } from "../../Contextos/ContextoGeneral";
import { useCdp } from "../../Contextos/ContextoCDP";
import html2pdf from "html2pdf.js";
import { useState, useEffect } from "react";
import imageCompression from 'browser-image-compression';


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
    display: grid;
    grid-template-columns: 1fr 1fr;
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

const ItemReporte = ({ txt = 'nombreReporte', hola = 'Lunes', fileImg, img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_lMN8noBKaljHKZsqVwBsDalTQNRv4Lk76Q&s' }) => {
    const [imgURL, setImgURL] = useState(img);
    const [fecha, setFecha] = useState('N/A');
    console.log();
    useEffect(() => {
        const compressImage = async (file) => {
            if (file.size > 1024 * 1024) { // 1MB = 1024 * 1024 bytes
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                };
                try {
                    const compressedFile = await imageCompression(file, options);
                    const objectURL = URL.createObjectURL(compressedFile);
                    setImgURL(objectURL);
                    return () => URL.revokeObjectURL(objectURL);
                } catch (error) {
                    console.error('Error al comprimir la imagen:', error);
                }
            } else {
                const objectURL = URL.createObjectURL(file);
                setImgURL(objectURL);
                return () => URL.revokeObjectURL(objectURL);
            }
        };

        const obtenerFoto = async (fileImg) => {
            if (fileImg.lastModifiedDate) {
                let day = fileImg.lastModifiedDate.getDate();
                let month = fileImg.lastModifiedDate.getMonth() + 1; // Los meses van de 0 a 11
                let year = fileImg.lastModifiedDate.getFullYear();
                let hours = fileImg.lastModifiedDate.getHours();
                let minutes = fileImg.lastModifiedDate.getMinutes();

                let formattedDate = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
                let formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
                setFecha(`${formattedDate} : ${formattedTime}`)
              
            } else {
                
            }
        }

        if (fileImg) {
            compressImage(fileImg);
            obtenerFoto(fileImg); // Aquí deberías manejar el resultado de esta función si es necesario
        }
    }, [fileImg]);
    return (
        <ContenedorImgStyled>
            <CentradoTexto>{txt} - {fecha}</CentradoTexto>
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
                filename: `${cdp}_${empleado}_Reporte_${reporteSeleccionado.tipoReporte}_${diaSemana}_${dia}_${mes}_${anio}`,
                image: { type: 'jpeg', quality: 0.70 },
                html2canvas: { scale: 3, useCORS: true }, 
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            html2pdf().from(element).set(opt).save().then(() => {
                setIsPrint(false); 
                //setMostrarReporte(false);
            });
        }
    }, [isPrint, setMostrarReporte]);

    const capitalizeFirstLetter = (str) => { {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }}

    return (
        <>
            <ContenedorTicketVenta id="ticketReporte">
                <ContenedorTitulo>
                    <ContenedorCentrado>
                        <Span size="28" isPrint={isPrint}>{empleado} -</Span>
                        <TituloCdp size="30" isPrint={isPrint}>{capitalizeFirstLetter(cdp)}</TituloCdp>
                        <Span size="28" isPrint={isPrint}>- {capitalizeFirstLetter(reporteSeleccionado.tipoReporte)}</Span>
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
