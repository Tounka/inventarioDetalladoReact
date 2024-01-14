import styled from "styled-components";
import '../hojas-de-estilo/ElementoTabla.css'

const ElementoTabla = ({ switchPregunta, className, funcionOnclick, texto }) => {

    return (
        <td
            className={`${className} ${
                switchPregunta ? "activo" : "noactivo"
            } `}
            onClick={funcionOnclick}
        >
            {texto}
        </td>
        
    );
};
const ElementoTablaStyled = styled(ElementoTabla)`
   background-color: blue;
   font-size: 20px;
   font-weight: bold;


   
`;

export default ElementoTablaStyled;
