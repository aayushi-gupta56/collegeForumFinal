import React, { useContext, useEffect, useRef } from 'react'
import axios from 'axios';
import AuthContext from '../context/authContext';
import './Components.css'

const Login = ()=>{
    const userID = useRef();
    const password = useRef();

    const { loginFunc } = useContext(AuthContext);

    const handleSubmit = (e)=>{
        e.preventDefault();

        const credentials = {
            userID: userID.current.value,
            password: password.current.value
        }

        axios.post("http://localhost:5000/api/auth/login", credentials)
            .then(res=>{
                sessionStorage.setItem("token", res.data.AccessToken);

                loginFunc(res.data);
                
                if(res.data.isAdmin===1)
                    window.location=`/admin/${res.data.userID}`
                
                else if(res.data.isClub===1)
                    window.location=`/club/${res.data.userID}`

                else
                    window.location = `/student/${res.data.userID}`
                    
                    
            }).catch(err=>{
                console.log(err.toJSON().status);
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
                    <button type='submit' id='login-account'>LOGIN</button>
                </form>
                <p id='forget-password'>DO NOT REMEMBER PASSWORD?</p>
                <h2>&nbsp;</h2>
            </div>
        </div>
    );
}

export default Login;