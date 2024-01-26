import React from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { preguntaAuditoria } from '../js/objetosAuditoria.js';

const BtnImprimirMcAuditoria = ({ componenteImprimir, calcularPorcentaje ,ObtenerPuntaje}) => {
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
      format: 'a4',
    });

    const totalWidth = pdfDoc.internal.pageSize.getWidth();
    const title = `Auditoria: ${sacarDate()}`;
    const startXTitle = (totalWidth - pdfDoc.getTextWidth(title)) / 2;

    pdfDoc.text(title, startXTitle, 12);

    const dateFormatted = sacarDate();

    const dataCopy = preguntaAuditoria.map((pregunta) => {
      const preguntaCopy = { ...pregunta };
      if (preguntaCopy.RespuestaNegativa !== "") {
        preguntaCopy.pregunta += "\n" + preguntaCopy.RespuestaNegativa;
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
        ['Resultado', '', calcularPorcentaje()],
      ],
      startY: pdfDoc.autoTable.previous.finalY + 10,
      styles: {
        fontSize: 10,
        
      },

    });
    pdfDoc.save(`Auditoria(${dateFormatted}).pdf`);
  };

  return (
    <button type="button" className="btn btn-secondary" onClick={imprimir}>Imprimir</button>
  );
};

export default BtnImprimirMcAuditoria;
