import styled from "styled-components";

export default function Radio ({type, id, name, value}){

    const handleChange = ()=>{
      
    }

    return <StyledRadio type={type} id={id} name={name} value={value} onChange={handleChange}></StyledRadio>
}

const StyledRadio = styled.input`
  width: 4rem;
  height: 4rem
  padding: 1rem;
`;