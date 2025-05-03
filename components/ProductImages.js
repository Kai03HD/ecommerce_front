import { useState } from "react";
import styled from "styled-components"

const Image = styled.img`
max-width: 100%;
max-height: 100%

`
const ImageButtons = styled.div`
display: flex;
flex-grow: 0;
 gap: 10px;
 margin-top: 10px;
`
const ImageButton = styled.div`
border: 1px solid #aaa;
   ${props => props.active ? `
      border-color: #ccc;
    ` : `
      border-color: transparent;
    `}
height: 40px;
padding: 2px;
border-radius: 5px;
cursor: pointer;
`
const BigImageWrapper = styled.div`
  text-align: center;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;
export default function ProductImage({images}){
    const [activeImage,setActiveImage] = useState(images?.[0]);
  
    return(
        <>
            <BigImageWrapper>
            <BigImage src={activeImage} />
             </BigImageWrapper>
            <ImageButtons>
                {images.map(image => (
                    <ImageButton   key={image}
                    active={image===activeImage}
                     onClick={() => setActiveImage(image)}>
                        <Image src={image} alt=""/>
                    </ImageButton>
                ))}
            </ImageButtons>
        </>
    )
}