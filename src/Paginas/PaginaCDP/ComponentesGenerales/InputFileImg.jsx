import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
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
    height: 300px;
    border: 2px solid #ccc;
    border-radius: 10px;
    object-fit:cover;
    
    `;
    const PreviewNoImg = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 300px;
    border: 2px solid #ccc;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
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


