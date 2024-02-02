import React from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { preguntaAuditoria } from '../js/objetosAuditoria.js';
import styled from "styled-components";

const Button = styled.button`
  margin-bottom:20px;
  padding: 10px;
`;

const BtnImprimirMcAuditoria = ({ componenteImprimir, calcularPorcentaje, ObtenerPuntaje, calcularResultado }) => {
  const sacarDate = () => {
    const fecha = new Date();
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    return `${dia}/${mes}/${anio} - ${hora}:${minutos}`;
  };

  const imprimir = () => {
    const pdfDoc = new jsPDF({
      format: [210, 350],
    });

    const totalWidth = pdfDoc.internal.pageSize.getWidth();
    const title = `Auditoria: ${sacarDate()}`;
    const startXTitle = (totalWidth - pdfDoc.getTextWidth(title)) / 2;

    pdfDoc.text(title, startXTitle, 12);

    const dateFormatted = sacarDate();

    const dataCopy = preguntaAuditoria.map((pregunta) => {
      const preguntaCopy = { ...pregunta };
      if (preguntaCopy.RespuestaNegativa !== "") {
        preguntaCopy.pregunta = { content: preguntaCopy.pregunta + "\n" + preguntaCopy.RespuestaNegativa, styles: { fillColor: [185, 3, 24], textColor: [255, 255, 255] } };
      }
      return preguntaCopy;
    });

    const columnas = [
      { header: 'ID', dataKey: 'id' },
      { header: 'Pregunta', dataKey: 'pregunta' },
      { header: 'Puntos', dataKey: 'puntos' }
    ];

    pdfDoc.autoTable({
      head: [columnas.map(col => col.header)],
      body: dataCopy.map(pregunta => [ pregunta.id, pregunta.pregunta, pregunta.puntos]),
      startY: 20,
      styles: {
        fontSize: 10,
        cell: { textAlign: 'center', padding: 5 },
      },
      columnStyles: {
        0: { halign: 'center' },  
        2: { halign: 'center' },  
      },
    });

    pdfDoc.autoTable({
      body: [
        ['Puntaje Total', '', ObtenerPuntaje()],
        ['Porcentaje', '', calcularPorcentaje()],
        ['Resultado', '', calcularResultado()],
      ],
      startY: pdfDoc.autoTable.previous.finalY + 10,
      styles: {
        fontSize: 10,
      },
    });

    pdfDoc.save(`Auditoria(${dateFormatted}).pdf`);
  };

  return (
    <Button type="button" className="btn btn-secondary" onClick={imprimir}>Imprimir</Button>
  );
};

export default BtnImprimirMcAuditoria;
