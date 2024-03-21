import React from "react";
import Item from '../componentes/Item';
import Separador from '../componentes/Separador';
import BtnImprimir from '../componentes/BtnFlotante';
import InputID from '../componentes/InputID';
import Footer from '../componentes/Footer'
import {  arregloProducto,
    arregloContenedoresProducto,
    arregloDesechablesProducto,
    arregloOperacional } from '../js/objetos';
import { useState } from 'react';

function PaginaInventarioDetallado() {
    const [nombre, setNombre] = useState ('');
    const [cdp, setCdp] = useState ('');
    return(
        <>
        
        
        <div className="container-sm" style={{ marginBottom: '20px' }}>
            <InputID setNombre={setNombre} setCdp={setCdp}/>

            <Separador titulo="Contenedores" />

            {arregloContenedoresProducto.map((producto, index) => (
                <Item key={index} objetoProducto= {producto} />
                ))}
            <Separador titulo="Producto" />
            
            {arregloProducto.map((producto, index) => (
                <Item key={index} objetoProducto= {producto} />
                ))}
            <Separador titulo="Desechables" />
            
            {arregloDesechablesProducto.map((producto, index) => (
                <Item key={index} objetoProducto= {producto} />
                ))}
            <Separador titulo="Operacionales" />
            
            {arregloOperacional.map((producto, index) => (
                <Item key={index} objetoProducto= {producto} />
            ))}

                <BtnImprimir nombre={nombre} cdp={cdp}/>

           
        </div>
        <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS, Es Solo Un Formato Digital Creado Para Facilitar Los Inventarios Detallados en CDP, La Pagina No Almacena Ningún Tipo De Dato.'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  />
        </>
        
    )
}

export default PaginaInventarioDetallado;