import styled from "styled-components";
import axios from 'axios'

export default function Button({ content, caption,tags, postImages }) {

  const handleClick = ()=>{
    const path = window.location.pathname.split('/');
    const userID = path[path.length-1];

    const formData = new FormData()
    formData.append("photo", postImages.current.files[0])
    formData.append("tags", tags.current.value)
    formData.append("caption", caption.current.value)

    axios.post(`http://localhost:5000/api/posts/${userID}`, formData, {
       headers :{
         "token" : `Bearer ${sessionStorage.getItem("token")}`
       }
     }).then(res=>{
       if(res.status===200)
        window.location = `/feed/${userID}`
     })
  }

  return <StyledButton onClick={handleClick}>{content}</StyledButton>;
}

const StyledButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
`;