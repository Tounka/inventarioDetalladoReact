import { useContext, useState } from "react";
import styled from "styled-components";
import { IoMdCheckmark } from "react-icons/io";

const ContenedorItemToDoStyled = styled.div`
    width: 600px;
    max-width: 100%;
    display: grid;
    grid-template-columns: 35px auto;
    gap: 15px;
    align-items: center;
    
    
`;
const BtnEspecialStyled =  styled.div`
    display: flex;
    align-items: center;
    
    font-size: 24px;
    color: var(--color-morado);
    cursor: pointer;
`;
const ContenedoresBtnStyled = styled.div`
    display: flex;
    justify-content:space-around;
    align-items: center;
    background-color: white;
    height: 35px;
    width: 100%;
    
    border-radius: 10px;
    
    
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





export const ItemToDoList = ({ estado = false, color, txtTarea = 'Limpiar CDP', id= 1 }) => {
    const [estadoTarea, setEstadoTarea] = useState(estado);
   
    const handleCheckbox = () => {
        
        setEstadoTarea(!estadoTarea);
        console.log(estadoTarea);
       
    };
    


    return (
        <ContenedorItemToDoStyled>

            <CheckboxStyled id={id} checked={estadoTarea} onClick={() => handleCheckbox()} >
                {estadoTarea ? <IoMdCheckmark /> : null}
                
            </CheckboxStyled>

            <TxtTarea htmlFor={id} estadoTarea={estadoTarea} color={color} onClick={() => handleCheckbox()} >
                {txtTarea}
            </TxtTarea>


        
        </ContenedorItemToDoStyled>
    );
};