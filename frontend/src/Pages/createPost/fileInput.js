import styled from "styled-components";

export default function RadioLabel ({type, name, id}){
    return <StyledInput type={type} name={name} id={id} multiple></StyledInput>
}

const StyledInput = styled.input`
  width: 4rem;
  height: 4rem
  padding: 1rem;
`;