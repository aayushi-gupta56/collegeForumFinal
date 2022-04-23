import React from "react";
import styled from 'styled-components';
import Input from './input';
import Button from './button'
import FileInput from "./fileInput";


const MainContainer = styled.div`
  display: flex;
  height: max-content;
  align-items: center;
  flex-direction: column;
  width: 30vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;

  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 1rem 0;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const CreatePost = ()=>{

    const caption = React.createRef();
    const tags =  React.createRef();
    const postImages = React.createRef(); 

    return(
        <div className="create-post">
            <MainContainer>
                <WelcomeText>CREATE POST</WelcomeText>
                <InputContainer>
                    <Input type="text" placeholder="Caption" ref={caption}/>
                    <Input type="text" placeholder="TAGS IN CSV FORMAT" ref={tags}/>
                    <FileInput name='post-image' ref={postImages}/>
                </InputContainer>
                <ButtonContainer>
                    <Button content="CREATE" caption={caption} tags={tags} postImages={postImages}/>
                </ButtonContainer>
                <HorizontalRule />
            </MainContainer>
        </div>
    )
}

export default CreatePost