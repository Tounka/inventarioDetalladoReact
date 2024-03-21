import React, { useState, useEffect } from "react";
import {DisplayPaginaBreaks} from '../componentes/Displays'
import { ContenedorPrimario } from "../componentes/Contenedores";
import TituloPrincipal from "../componentes/TituloPagina";
import Footer from "../componentes/Footer";
import {CardMcBreak, CardAgregar} from '../componentes/ComponentesMcBreak'
import img from '../img/userRandom.jpg'

import { getFirestore, collection, getDocs } from "firebase/firestore";
import {app} from '../componentes/McbreakBaseDeDatos' 

function PaginaMcBreak(){
    const db = getFirestore(app);
    const [listaEmpleados, setListaEmpleados] = useState([]);
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const consulta = collection(db, 'Empleados');
                const listaEmpleadosSnapshot = await getDocs(consulta);

                if (listaEmpleadosSnapshot.docs.length > 0) {
                    let lista = listaEmpleadosSnapshot.docs.map(documento => documento.data());
                    setListaEmpleados(lista);
                
                } else {
                    console.log('No se encontraron documentos');
                }
            } catch (error) {
                console.error('Error al obtener documentos:', error.message);
            }
        };

        obtenerDatos();
    }, []);

    
    return(
        <DisplayPaginaBreaks>
            <TituloPrincipal textoTitulo="McBreaks" />
            <ContenedorPrimario> 
                <CardAgregar db={db} setListaEmpleados= {setListaEmpleados} ></CardAgregar>
                {listaEmpleados.map((empleado) => (
                    <CardMcBreak  SrcImg={empleado.img} Nombre={empleado.nombre} Apodo={empleado.apodo} ColorDeBg={empleado.bgColor} />
                ))
                    
                }
                
            </ContenedorPrimario>
            <Footer textoPrincipalFooter='No Se Trata De Un Software Desarrollado Por ARCOS DORADOS'  textoSecundarioFooter='Desarrollado por Ramon Castillo'  />
        </DisplayPaginaBreaks>
    )
}


export default PaginaMcBreak;