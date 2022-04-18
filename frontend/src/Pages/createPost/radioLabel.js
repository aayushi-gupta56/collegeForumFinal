import styled from "styled-components";

export default function RadioLabel ({lbl}){
    return <StyledLabel htmlFor={lbl}>{lbl}</StyledLabel>
}

const StyledLabel = styled.label`
  width: 4rem;
  height: 4rem
  padding: 1rem;
`;