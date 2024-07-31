import React, { createContext, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
import { app } from '../componentes/McbreakBaseDeDatos'; // Asegúrate de importar correctamente

const db = getFirestore(app);

// Crear el contexto
const EmpleadosContext = createContext();

export const EmpleadosProvider = ({ children }) => {
    const [listaEmpleados, setListaEmpleados] = useState([]);
    const [modalExtras, setModalExtras] = useState(false);
    const [cajaSeleccionada, setCajaSeleccionada] = useState('');
    const [cajas, setCajas] = useState({});

    const ObtenerCajas = async () =>{
        try {
            const consulta = collection(db, 'Cajas');
            const listaCajasSnapshot = await getDocs(consulta);
           
            if (listaCajasSnapshot.docs.length > 0) {
                const listaCajas = listaCajasSnapshot.docs.reduce((acc, doc) => {
                    acc[doc.id] = doc.data();
                    return acc;
                }, {});
                setCajas(listaCajas);
                console.log("---------------",listaCajas);
            } else {
                console.log('No se encontraron documentos');
            }
        } catch (error) {
            console.error('Error al obtener documentos:', error.message);
        }
    }

    ObtenerCajas();

    const actualizarCaja = (id, empleado) => {
        setCajas((prevCajas) => ({
            ...prevCajas,
            [id]: {fecha: new Date(), empleado},
        }));
    };

    const obtenerDatos = async () => {
        try {
            const consulta = collection(db, 'Empleados');
            const listaEmpleadosSnapshot = await getDocs(consulta);

            if (listaEmpleadosSnapshot.docs.length > 0) {
                const lista = listaEmpleadosSnapshot.docs.map(documento => ({
                    id: documento.id,
                    ...documento.data()
                }));
                setListaEmpleados(lista);
            } else {
                console.log('No se encontraron documentos');
            }
        } catch (error) {
            console.error('Error al obtener documentos:', error.message);
        }
    };

    // Función para actualizar la lista de empleados
    const actualizarListaEmpleados = async () => {
        await obtenerDatos();
    };
    
    const actualizarContenidoCajas = async (id, empleado) => {
        try {
            const docRef = doc(db, 'Cajas', id); // 'cajas' es el nombre de la colección, y id es el id del documento
            const data = {
                empleado : empleado,
                fecha: new Date(),
            }
            await setDoc(docRef, data);
            console.log('Documento actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar documento:', error.message);
        }
    };
    useEffect(() => {
        obtenerDatos();
    }, []);
    

    return (
        <EmpleadosContext.Provider value={{ listaEmpleados, setListaEmpleados, db, modalExtras, setModalExtras, cajaSeleccionada, setCajaSeleccionada, actualizarCaja, cajas, actualizarListaEmpleados, actualizarContenidoCajas }}>
            {children}
        </EmpleadosContext.Provider>
    );
};

export const useEmpleados = () => {
    const context = React.useContext(EmpleadosContext);
    if (context === undefined) {
        throw new Error('useEmpleados debe estar usado dentro de un EmpleadosProvider');
    }
    return context;
};
