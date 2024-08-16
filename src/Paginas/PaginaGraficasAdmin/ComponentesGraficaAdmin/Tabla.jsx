import { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { useDataOrdenada } from "../DataGraficasAdminContext";

const Table = styled.table`
    
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 18px;
    text-align: left;
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  
`;

const ThTable = styled.th`
    background-color: #4CAF50;
    color: white;
    padding: 12px 15px;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    @media (max-width: 450px) {
      font-size: 14px;
      padding: 8px 5px;
    }
    
`;

const TrTable = styled.tr`
    border-bottom: 1px solid #dddddd;

    &:nth-of-type(even) {
        background-color: #f3f3f3;
    }

    &:hover {
        background-color: #f1f1f1;
    }
`;

const TdTable = styled.td`
    padding: 12px 15px;
    color: #333;    
    @media (max-width: 450px) {
      font-size: 16px;
      padding: 8px 5px;
    }

`;
const ContTxt = styled.td`
    display: flex;
    justify-content: center;
    

`;
const ContenedorIcons = styled(ContTxt)`
    cursor: pointer;
    user-select: none;
    font-size: 30px;
    @media (max-width: 450px) {
      font-size: 24px;
      
    }
`;

export const TablaResumen = () => {
    const {dataOrdenada, OrdenarData, OrdenarDataConDias} = useDataOrdenada();
  return (
    <Table>
      <thead>
        <TrTable>
          <ThTable> <ContenedorIcons> # </ContenedorIcons> </ThTable>
          <ThTable>Nombre</ThTable>
          <ThTable onClick={() => OrdenarData("value")}> <ContenedorIcons> <AiOutlineFieldNumber  /> </ContenedorIcons>  </ThTable>
          <ThTable onClick={() => OrdenarDataConDias("value")}> <ContenedorIcons> <IoTime  /> </ContenedorIcons>  </ThTable>
          <ThTable onClick={() => OrdenarData("valueMonetario")}> <ContenedorIcons>  <FaMoneyBillWave  /> </ContenedorIcons> </ThTable>
          <ThTable onClick={() => OrdenarDataConDias("valueMonetario")}> <ContenedorIcons>  <IoTime /> </ContenedorIcons> </ThTable>
        </TrTable>
      </thead>
      <tbody>
        {dataOrdenada.map((persona, index) => (
          <TrTable key={index}>
            <TdTable>{index + 1}</TdTable>
            <TdTable>{persona.name}</TdTable>
            <TdTable><ContTxt> {persona.value} </ContTxt></TdTable>
            <TdTable><ContTxt> {(persona.value) / persona.cantidadTickets} </ContTxt></TdTable>
            <TdTable><ContTxt> ${persona.valueMonetario} </ContTxt></TdTable>
            <TdTable><ContTxt> ${(persona.valueMonetario) / persona.cantidadTickets} </ContTxt></TdTable>
          </TrTable>
        ))}
      </tbody>
    </Table>
  );
};
