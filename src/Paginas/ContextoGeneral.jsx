import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, setDoc, getDoc, arrayUnion, getFirestore, where, query } from 'firebase/firestore';
import { app } from '../componentes/McbreakBaseDeDatos'; // Asegúrate de importar correctamente


const db = getFirestore(app);

// Crear el contexto
const EmpleadosContext = createContext();

export const EmpleadosProvider = ({ children }) => {
    const [listaEmpleados, setListaEmpleados] = useState([]);
    const [modalExtras, setModalExtras] = useState(false);
    const [cajaSeleccionada, setCajaSeleccionada] = useState('');
    const [cajas, setCajas] = useState({});
    const [tickets, setTickets] = useState({});

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

    useEffect(() => {
        ObtenerCajas();
    }, []);

    const actualizarCaja = (id, empleado) => {
        ObtenerCajas()
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
                console.log(listaEmpleados);
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
    
    const actualizarContenidoCajas = async (id, empleado, extras = {}) => {
        try {
            const docRef = doc(db, 'Cajas', id); // 'cajas' es el nombre de la colección, y id es el id del documento
            const data = {
                empleado : empleado,
                fecha: new Date(),
                extras: extras
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

    const enviarTicket = async (ticket) => {
        // Obtener la fecha actual
        const hoy = ticket.fechaInicio;
        const milliseconds = (hoy.seconds * 1000) + (hoy.nanoseconds / 1000000);

        // Crear un objeto Date con los milisegundos
        const fechaMili = new Date(milliseconds);
    
        // Extraer el año, mes y día
        const anio = fechaMili.getFullYear();
        const mes = fechaMili.getMonth() + 1; // Los meses en JavaScript son 0-indexados
        const dia = fechaMili.getDate();
    
        const fecha = `${dia}-${mes}-${anio}`;
    
        try {
            // Referencia al documento con el nombre de la fecha (dd/mm/yyyy)
            const docRef = doc(db, 'Tickets', fecha);
            const docSnap = await getDoc(docRef);
    
            if (!docSnap.exists()) {
                // Crear el documento si no existe
                await setDoc(docRef, {
                    fecha: hoy, // Guardar la fecha como cadena en formato dd/mm/yyyy
                    tickets: [] // Inicializar el array de tickets vacío
                });
            }
     
            // Añadir el ticket a la colección de tickets dentro del documento
            await updateDoc(docRef, {
                tickets: arrayUnion(ticket) // Asegura que el ticket se añada al array
            });
    
            console.log(`Ticket añadido al documento con la fecha: ${fecha}`);
        } catch (error) {
            console.error("Error al añadir el ticket: ", error);
        }
    };
    
    const handleSendTicket = () => {
        const nuevoTicket = {
            id: 1,
            descripcion: 'Este es un nuevo ticket',
            // otras propiedades del ticket
        };
    
        enviarTicket(nuevoTicket);
    };

    const recibirTicket = async () => {
        try {
            const hoy = new Date();
            const ultimaSemana = new Date(hoy);
            ultimaSemana.setDate(hoy.getDate() - 30); 
            ultimaSemana.setHours(0, 0, 0, 0);  
    
            const consulta = query(
                collection(db, 'Tickets'),
                where('fecha', '>=', ultimaSemana) 
            );
    
            const listaTicketsSnapshot = await getDocs(consulta);
    
            if (listaTicketsSnapshot.docs.length > 0) {
                const listaTickets = listaTicketsSnapshot.docs.reduce((acc, doc) => {
                    acc[doc.id] = doc.data();
                    return acc;
                }, {});
                setTickets(listaTickets);
                console.log('---------------', listaTickets); // Corregido a 'listaTickets' en lugar de 'tickets'
            } else {
                console.log('No se encontraron documentos');
            }
        } catch (error) {
            console.error('Error al obtener documentos:', error.message);
        }
    };
    
    const actualizarTickets = async () => {
        await recibirTicket();
    };
    
    useEffect(() => {
        console.log('tickets');
        console.log(tickets);
    }, [tickets]);

    const SeleccionarEmpleado = (id) =>{

        return listaEmpleados.find(objeto => objeto.id === id);
    }
    return (
        <EmpleadosContext.Provider value={{ listaEmpleados, setListaEmpleados, db, modalExtras, setModalExtras, cajaSeleccionada, setCajaSeleccionada, actualizarCaja, cajas, actualizarListaEmpleados, actualizarContenidoCajas, enviarTicket, handleSendTicket, actualizarTickets, tickets, SeleccionarEmpleado }}>
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
