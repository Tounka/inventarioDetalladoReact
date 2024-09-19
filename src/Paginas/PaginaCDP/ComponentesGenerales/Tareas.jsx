import { useContext, useState } from "react";
import styled from "styled-components";
import { IoMdCheckmark } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useEmpleados } from "../../Contextos/ContextoGeneral";
import { useCdp } from "../../Contextos/ContextoCDP";

const ContenedorItemToDoStyled = styled.div`
    width: 600px;
    max-width: 90%;
    display: grid;
    grid-template-columns: ${props => props.admin ? "35px auto 35px" : '35px auto'  } ;
    
    
    gap: 15px;
    align-items: center;
    
    
`;
const BtnEspecialStyled =  styled.div`
    display: flex;
    align-items: center;
    
    font-size: 24px;
    color: var(--color-morado);
    
`;
const ContenedoresBtnStyled = styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center;
    background-color: white;
    height: 35px;
    width: 100%;
    
    border-radius: 10px;

    cursor:pointer;
    
    
`;
const CheckboxStyled = styled.div`
    width: 35px;
    height: 35px;
    border: none;
    border-radius: 5px;
    background-color: var(--RojoPrincipal);
    cursor: pointer;
    appearance: none;
    position: relative;
    margin: 0;
    color: white;

    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;


`;
const TxtTarea = styled.label`
    width: 100%;
    
    text-wrap: prety;
    height: 100%;
    font-size: 16px;
    line-height: 1.5;
    font-size: 18px;
    text-decoration: ${props => props.estadoTarea ? 'line-through' : ''};
    background-color: var(--RojoPrincipal);

    color:  white ;
    user-select: none;
    padding-left: 10px;
    border-radius: 5px 20px 20px 5px;

    
    display: flex;
    align-items: center;
`;

const BtnEspecial = ({icon, fn}) =>{

    return(
        <BtnEspecialStyled>
            {icon}
        </BtnEspecialStyled>
    )
}




export const ItemToDoList = ({ estado = false, color, txtTarea = 'Limpiar CDP', id= 1, admin, cajaSeleccionada, setTareas }) => {
    const [estadoTarea, setEstadoTarea] = useState(estado);
    const {setModalCDPToDo, setCrearDocCdp, setCDPSeleccionado} = useCdp();
         
    
    const handleCheckbox = () => {
        
        setEstadoTarea(!estadoTarea);
        setCrearDocCdp(false);
   
        console.log(estadoTarea);


       
       
    };

    const handleClickBtnEspecial = () => {
        setModalCDPToDo(true);
        setCDPSeleccionado(cajaSeleccionada);

    }
    


    return (
        <ContenedorItemToDoStyled admin={admin} >

            <CheckboxStyled id={id} checked={estadoTarea} onClick={() => handleCheckbox()} >
                {estadoTarea ? <IoMdCheckmark /> : null}
                
            </CheckboxStyled>

            <TxtTarea htmlFor={id} estadoTarea={estadoTarea} color={color} onClick={() => handleCheckbox()} >
                {txtTarea}
            </TxtTarea>

            {admin ? (   
            <ContenedoresBtnStyled onClick={() => handleClickBtnEspecial() }>
                <BtnEspecial icon = {<MdEdit />} />
            </ContenedoresBtnStyled>) 
            : (<></>)}
         

        </ContenedorItemToDoStyled>
    );
};