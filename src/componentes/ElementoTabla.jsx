
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

export default ElementoTabla;
