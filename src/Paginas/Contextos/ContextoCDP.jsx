import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, setDoc, getDoc, arrayUnion, getFirestore, where, query, addDoc } from 'firebase/firestore';
import { useEmpleados } from './ContextoGeneral';





// Crear el contexto
const CdpContext = createContext();

export const CdpProvider = ({ children }) => {
    const {db} = useEmpleados();
    const [tareasCDP, setTareasCDP] = useState([]);
    const [crearDocCdp, setCrearDocCdp] = useState();
    const [CDPSeleccionado, setCDPSeleccionado] = useState();
    const [modalCDPToDo, setModalCDPToDo] = useState(false);


    const CrearDocumento = async (idDocumento, documento , nuevaTarea) => {
        try {
            // Obtén una referencia al documento
            const docRef = doc(db, documento, idDocumento);
            
            
            await setDoc(docRef, {
                tareas: arrayUnion(nuevaTarea) // Usa arrayUnion para añadir sin duplicar
            }, { merge: true }); // merge: true para crear o actualizar el documento
            
            console.log('Documento creado o actualizado con éxito');
        } catch (error) {
            console.error('Error al crear o actualizar el documento:', error);
        }
    };

    const ObtenerDocumento = async (consulta) => {
        try {
            const snapshot = await getDocs(consulta);
    
            if (snapshot.docs.length > 0) {
                const documentos = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                return documentos;
            } else {
                console.log('No se encontraron documentos');
                return [];  
            }
        } catch (error) {
            console.error('Error al obtener documentos:', error.message);
            throw error;  
        }
    };
    
    useEffect(() => {
        const fetchTareas = async () => {
          try {
            const consultaTareasCdp = collection(db, 'Tareas');
            let tareasRam = await ObtenerDocumento(consultaTareasCdp);
            setTareasCDP(tareasRam);
            console.log(tareasRam);
          } catch (error) {
            console.error('Error al obtener tareas:', error);
          }
        };
    
        fetchTareas();
      }, [db]); // Agregar db como dependencia si puede cambiar
    

    
    

    return (
        <CdpContext.Provider value={{ CrearDocumento, ObtenerDocumento,crearDocCdp, setCrearDocCdp,CDPSeleccionado, setCDPSeleccionado, 
            setModalCDPToDo, modalCDPToDo, tareasCDP }}>
            {children}
        </CdpContext.Provider>
    );
};

export const useCdp = () => {
    const context = React.useContext(CdpContext);
    if (context === undefined) {
        throw new Error('useCdp debe estar usado dentro de un CdpProvider');
    }
    return context;
};

