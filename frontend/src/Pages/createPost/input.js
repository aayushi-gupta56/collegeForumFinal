import styled from "styled-components";
import React from 'react'

const StyledInput = styled.textarea`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 0.5rem;
  width: 80%;
  height: 10rem;
  padding: 1rem;
  border: none;
  margin: 20px 0 20px 0;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 0.5rem;
  }
  &::placeholder {
    color: #000;
    font-weight: 100;
    font-size: 1rem;
  }
`;

const Input = React.forwardRef((props,ref) => {
  return <StyledInput type={props.type} placeholder={props.placeholder} rows={25} ref={ref}/>;
});



export default Input;