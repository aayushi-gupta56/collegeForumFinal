import React, { useRef, useState } from 'react'
import axios from 'axios';
import './Components.css'

const Login = ()=>{
    const userID = useRef();
    const password = useRef();
    const [errorText, setErrorText] = useState('');

    const handleSubmit = (e)=>{
        e.preventDefault();

        const credentials = {
            userID: userID.current.value,
            password: password.current.value
        }

        axios.post("http://localhost:5000/api/auth/login", credentials)
            .then(res=>{
                sessionStorage.setItem("token", res.data.AccessToken);

                    if(res.data.isAdmin===1)
                        window.location=`/admin/${res.data.userID}`
                
                    else if(res.data.isClub===1)
                        window.location=`/club/${res.data.userID}`

                    else
                        window.location = `/student/${res.data.userID}`
                    
            }).catch(err=>{
                if(err.response.status===401)
                    setErrorText(err.response.data)
                console.log(err)
            })
    }

    return(
        <div className="container">
            <div className="top"></div>
            <div className="bottom"></div>
            <div className="center">
                <h2>Please Sign In</h2>
                <form method='post' onSubmit={handleSubmit}>
                    <input
                        className='login-input' 
                        type="text" 
                        id="userID"
                        name="userID" 
                        placeholder="userID"
                        ref={userID}
                        required
                    />
                    <input
                        className='login-input'  
                        type="password" 
                        id="password"
                        name="password" 
                        placeholder="password"
                        ref={password}
                        required
                    />
                    <div className='error-text'>{errorText}</div>
                    <button type='submit' id='login-account'>LOGIN</button>
                </form>
                <p id='forget-password'>DO NOT REMEMBER PASSWORD?</p>
                <h2>&nbsp;</h2>
            </div>
        </div>
    );
}

export default Login;