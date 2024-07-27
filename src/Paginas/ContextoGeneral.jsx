// EmpleadosContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../componentes/McbreakBaseDeDatos'; // Asegúrate de importar correctamente

const db = getFirestore(app);

// Crear el contexto
const EmpleadosContext = createContext();

export const EmpleadosProvider = ({ children }) => {
    const [listaEmpleados, setListaEmpleados] = useState([]);
    const [modalExtras, setModalExtras] = useState(false);
    const [cajaSeleccionada, setCajaSeleccionada] = useState('');
    const [cajas, setCajas] = useState({})
    const actualizarCaja = (id, nuevoContenido) => {
        setCajas((prevCajas) => ({
          ...prevCajas,
          [id]: nuevoContenido,
        }));
      };
    useEffect(() => {
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

        obtenerDatos();
    }, []);

    // Pasar el valor como prop al Provider
    return (
        <EmpleadosContext.Provider value={{ listaEmpleados, setListaEmpleados, db, modalExtras, setModalExtras, cajaSeleccionada, setCajaSeleccionada, actualizarCaja, cajas}}>
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
