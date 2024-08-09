import styled from "styled-components";
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;

    position: ${props => props.bg ? 'absolute' : ''};
    top: ${props => props.bg ? '0' : ''};
    left: ${props => props.bg ? '0' : ''};

    background-color: ${props => props.color ? props.color : ''};

    z-index: ${props => props.bg ? '-1000' : ''};
    display: ${props => props.bg ? 'flex' : ''};
    justify-content: ${props => props.bg ? 'center' : ''};
    align-items: ${props => props.bg ? 'center' : ''};
    z-index: ${props => props.zIndex ? props.zIndex : ''};
    
    
    position: ${props => props.top ? 'absolute' : ''};
    top: ${props => props.top ? '0' : ''};
    picture{
        height:100%;
        width:100%;

    }

    
    
  img {
    width: 100%;
    height: ${props => props.top ? '' : '100%'};
    object-fit: cover;
    object-position: ${props => props.obPosition ? props.obPosition : ''};
    padding-top: ${props => props.paddingTop ? props.paddingTop : ''};
  }
  
`;

export const ImgPicture = ({ src, alt, index, hover, bg, zIndex, obPosition, top, color, paddingTop }) => {
    
    return src ? (
        <ImageContainer index={index}  hover={hover} bg={bg} zIndex={zIndex} obPosition={obPosition} top={top} color={color} paddingTop={paddingTop} >
            <picture>
                <source srcSet={`${src}`} type="image/webp" />
                <source srcSet={`${src}`} type="image/jpeg" />
                <img src={`${src}`} alt={alt} loading="lazy"/>
            </picture>
        </ImageContainer>
    ) : null;
};
