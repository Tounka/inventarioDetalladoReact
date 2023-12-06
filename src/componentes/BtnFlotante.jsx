import React from "react";
import { FaPrint } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import '../hojas-de-estilo/BtnFlotante.css';
import { arregloProducto, arregloContenedoresProducto, arregloDesechablesProducto, arregloOperacional } from '../js/objetos';

function BtnImprimir(props) {
    function imprimir() {
        const pdfDoc = new jsPDF();
        const totalWidth = pdfDoc.internal.pageSize.getWidth();
        const columnWidths = [
            totalWidth * 0.6 - 10,
            totalWidth * 0.20 - 10,
            totalWidth * 0.20 - 10,
        ];

        const tableRows = [];

        const arregloListasItems = [arregloContenedoresProducto, arregloProducto, arregloDesechablesProducto, arregloOperacional];
        let n = 0;
        arregloListasItems.forEach(arreglo => {
            tableRows.push(['', '', '']);
            n++;
            arreglo.forEach(itemArreglo => {
                tableRows.push([itemArreglo.nombre, itemArreglo.cantidad, itemArreglo.cantidadCritica]);
            });
        });

        pdfDoc.autoTable({
            head: [['Producto', 'Cantidad Actual', 'Recomendación']],
            body: tableRows,
            columnStyles: {
                0: { cellWidth: columnWidths[0] },
                1: { cellWidth: columnWidths[1], halign: "center" },
                2: { cellWidth: columnWidths[2], halign: "center" },
            },
            styles: {
                cellPadding: 1,
                lineWidth: .3, // Ancho del borde
                lineColor: "#000000", // Color del borde
            },
            margin: { top: 40 },
            theme: 'grid',
        });
        pdfDoc.setFontSize(20);
        let textToCenterTitle = 'Inventario Detallado: ';
        const textToCenterDate = pdfDoc.splitTextToSize(new Date().toLocaleString(), totalWidth - 20);
        textToCenterTitle = textToCenterTitle + textToCenterDate
        const startXTitle = (pdfDoc.internal.pageSize.width - pdfDoc.getTextDimensions(textToCenterTitle).w) / 2;
        pdfDoc.text(textToCenterTitle, startXTitle, 20);

        
    
        pdfDoc.setFontSize(16);
        const textToCenterNombre = props.nombre +', ' + props.cdp;
        const startTextoNombre = (pdfDoc.internal.pageSize.width - pdfDoc.getTextDimensions(textToCenterNombre).w) / 2;
        pdfDoc.text(textToCenterNombre, startTextoNombre, 28);

      

        pdfDoc.output('dataurlnewwindow');
    }

    return (
        <div className="contenedorBtnFlotante" onClick={imprimir}>
            <FaPrint className="iconoPrint" />
        </div>
    );
}

export default BtnImprimir;
