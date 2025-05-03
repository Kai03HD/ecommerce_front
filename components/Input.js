import styled from "styled-components"

const StyledInput = styled.input`
    width: 100%;
    margin-bottom: 5px;
    border: 1px solis #ccc;
    border-radius: 5px;
    box-sizing: border-box
    padding: 5px;
`
export default function Input(props){
    return(
        <StyledInput {...props}/>
    )
}