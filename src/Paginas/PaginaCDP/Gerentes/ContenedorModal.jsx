import styled from "styled-components";

const ContenedorModal = styled.div`
    display: ${props => props.switchModal ? 'flex' : "none"};
    position: ${props => props.switchModal ? 'fixed' : "none"};
    left: ${props => props.switchModal ? '0' : "none"};
    top: ${props => props.switchModal ? '0' : "none"};
    width: 100%;
    height: 100%;
    min-height: 100dvh;
    min-width: 100dvw;

    background-color: #00000047;

`;
export const Modal = ({id, children }) => {

    return(
        <ContenedorModal id = {id}>
            {children }
        </ContenedorModal>
    )
}