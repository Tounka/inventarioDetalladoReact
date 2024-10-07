import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, setDoc, getDoc, arrayUnion, getFirestore, where, query, addDoc, Timestamp } from 'firebase/firestore';
import { useEmpleados } from './ContextoGeneral';





// Crear el contexto
const CdpContext = createContext();

export const CdpProvider = ({ children }) => {
    const {db} = useEmpleados();
    const [tareasCDP, setTareasCDP] = useState([]);
    const [tareasCDPDiarias, setTareasCDPDiarias] = useState();
    const [crearDocCdp, setCrearDocCdp] = useState();
    const [CDPSeleccionado, setCDPSeleccionado] = useState('');
    const [reporteSeleccionado, setReporteSeleccionado] = useState('');

    const [modalCDPToDo, setModalCDPToDo] = useState(false);
    const [modalCDPTicket, setModalCDPTicket] = useState(false);
    const [modalCDPFotos, setModalCDPFotos] = useState(false);
    


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

    const CrearDocumentoMeta = async (idDocumento, documento , metas) => {
        try {
            // Obtén una referencia al documento
            const docRef = doc(db, documento, idDocumento);
            
            
            await setDoc(docRef, 
                metas // Usa arrayUnion para añadir sin duplicar
            , { merge: true }); // merge: true para crear o actualizar el documento
            
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
      }, [db]); 


    
      const fetchTareasDiarias = async () => {
        try {
            const now = new Date();
    
            // Crear el Timestamp para el inicio y fin del día
            const todayStart = Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
            const todayEnd = Timestamp.fromDate(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999));
    
            const consultaTareasCdp = collection(db, 'Metas');
    
            const q = query(
                consultaTareasCdp,
                where('fecha', '>=', todayStart),
                where('fecha', '<=', todayEnd)
            );
    
            const querySnapshot = await getDocs(q);
            const tareasRam = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
            setTareasCDPDiarias(tareasRam);
        } catch (error) {
            console.error('Error al obtener tareas:', error);
        }
    };

    useEffect(() => {
        fetchTareasDiarias();
    }, [db]);

      
    
    

    return (
        <CdpContext.Provider value={{ CrearDocumento, ObtenerDocumento,crearDocCdp, setCrearDocCdp,CDPSeleccionado, setCDPSeleccionado, 
            setModalCDPToDo, modalCDPToDo, tareasCDP,CrearDocumentoMeta, tareasCDPDiarias,modalCDPTicket,setModalCDPTicket, modalCDPFotos, setModalCDPFotos,
            reporteSeleccionado,setReporteSeleccionado }}>
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

