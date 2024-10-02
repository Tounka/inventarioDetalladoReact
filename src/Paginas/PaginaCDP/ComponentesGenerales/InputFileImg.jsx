import React, { useState } from 'react';
import styled from 'styled-components';
import { BtnEspecial } from './Tareas';
import { FaCamera } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
    margin: 10px;
  background-color: var(--RojoPrincipal);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
   opacity: .9;
  }
`;

    const Preview = styled.img`
   
    width: 100%;
   
    height: ${props => props.crew ? '100%' : '300px'};
    border: ${props => props.crew ? '' : '2px solid #ccc'} ;
    border-radius: 10px;
    object-fit:cover;
    
    `;

    const PreviewNoImg = styled.div`
    margin-top: 20px;
    width: 100%;
    height: ${props => props.crew ? '100%' : '300px'};
    border: 2px solid #ccc;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    
    `;
        const PreviewNoImgCrew = styled.label`
        margin-top: 20px;
        width: 100%;
        height:  100%;
        border: 2px solid #ccc;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        
        `;

export const InputImg = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
  
      
      {image ? <Preview  src={image} alt="Vista previa" /> : <PreviewNoImg> Agrega una imagen </PreviewNoImg>}
      <Label htmlFor="file-input">Subir Imagen</Label>
      <Input
        type="file"
        accept="image/*"
        id="file-input"
        onChange={handleFileChange}
      />
    </Container>
  );
};

const ContainerCrew = styled(Container)`
  display: flex;
  width: 100%;
  height: 150px;
  flex-direction: row;
`

const BtnEspecialStyled =  styled.label`
    display: flex;
    align-items: center;
    
    font-size: 24px;
    color: var(--color-morado);
    
`;

const LabelEspecial = ({icon, fn, link}) =>{

  return(
      <BtnEspecialStyled htmlFor={link}>
          {icon}
      </BtnEspecialStyled>
  )
}
export const InputImgCrew = ({ tipoImagen, id, setFieldValue }) => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);  // Actualizamos el estado local para la vista previa
        setFieldValue(id, file);  // Actualizamos el valor en Formik con el archivo
        console.log(id, file);    // Puedes ver que ahora el archivo se registra correctamente
      };
      reader.readAsDataURL(file); // Lee el archivo para generar la vista previa
    }
  };

  return (
    <ContainerCrew>
      {image ? (
        <PreviewNoImgCrew htmlFor={id}>
          <Preview crew src={image} alt="Vista previa" />
        </PreviewNoImgCrew>
      ) : (
        <PreviewNoImgCrew htmlFor={id}>{tipoImagen}</PreviewNoImgCrew>
      )}

      <Input
        type="file"
        accept="image/*"
        id={id}
        onChange={handleFileChange}
      />
    </ContainerCrew>
  );
};
