import styled from "styled-components";
import { useState } from "react";
import '../hojas-de-estilo/ElementoTablaInput.css'
const ElementoTabla = ({ switchPregunta, className, texto, preguntaAuditoria, id }) => {
  const [value, setValue] = useState("");

  const handleChangeArreglo = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    preguntaAuditoria.forEach(item => {
      if (item.id === id) {
        item.RespuestaNegativa = inputValue;
      }
    });

    console.log(preguntaAuditoria);
  };

  const validarTextoInferior = () => {
    const respuestaNegativa = preguntaAuditoria.find(item => item.id === id)?.RespuestaNegativa;

    if (respuestaNegativa && respuestaNegativa !== "") {
      return <p className="respuestaNegativa">{respuestaNegativa}</p>;
    } else {
      return null;
    }
  };

  return (
    <td
      className={`${className} ${
        switchPregunta ? "activo" : "noactivo"
      } `}
    >
      {switchPregunta ? (
        <>
          {texto}
          {validarTextoInferior()}
        </>
      ) : (
        <input type="text" aria-label="First name" className="form-control" onChange={handleChangeArreglo} value={value} />
      )}
    </td>
  );
};

const ElementoTablaStyled = styled(ElementoTabla)`
  background-color: blue;
  font-size: 20px;
`;

export default ElementoTablaStyled;
