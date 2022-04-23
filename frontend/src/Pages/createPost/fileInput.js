import React from "react";
import styled from "styled-components";

const FileInput = React.forwardRef((props, ref)=>{
    return <StyledInput type='file' name={props.name} ref={ref} multiple={true}></StyledInput>
})

const StyledInput = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 0.5rem;
  width: 80%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding:0px;
  border: none;
  margin: 20px 0 20px 0;
  outline: none;
  color: #3c354e;
  font-size: 20px;
  font-weight: bold;
`;

export default FileInput