import React from "react";
import jsPDF from 'jspdf';

const BtnImprimirMcAuditoria = ({ componenteImprimir }) => {
    const sacarDate = () => {
        const fecha = new Date();

        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1; // Se suma 1 ya que los meses comienzan desde 0
        const anio = fecha.getFullYear();
        const hora = fecha.getHours();
        const minutos = fecha.getMinutes();

        // Retornar el string formateado
        return `${dia}/${mes}/${anio} - ${hora}:${minutos}`;
    };

    const imprimir = () => {
        const pdfDoc = new jsPDF({
            format: [210, 320],
        });

        const totalWidth = pdfDoc.internal.pageSize.getWidth();
        const title = `Auditoria : ${sacarDate()}`;

        // Calcular la posición inicial para centrar el título
        const startXTitle = (totalWidth - pdfDoc.getTextWidth(title)) / 2;

        // Agregar el título centrado
        pdfDoc.text(title, startXTitle, 12);

        // Agregar la fecha debajo del título
        const dateFormatted = sacarDate();

        // Agregar la tabla
        pdfDoc.autoTable({ html: '.tablaAuditoria', startY: 20 });

        // Guardar el PDF
        pdfDoc.save(`Auditoria(${dateFormatted}).pdf`);
    };

    return (
        <button type="button" className="btn btn-secondary" onClick={imprimir}>Imprimir</button>
    );
};

export default BtnImprimirMcAuditoria;
