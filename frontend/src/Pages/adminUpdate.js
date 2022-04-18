import axios from "axios";
import React, { useRef } from "react";
import './Pages.css'

const AdminUpdate = ()=>{
    const email = useRef();
    const password = useRef();

    const handleSubmit = (e)=>{
        e.preventDefault();

        const user = {
            email : email.current.value,
            password : email.current.value
        };

        const params = window.location.pathname.split('/');
        const userID = params[params.length-1];

        if(window.confirm("This action can't be undone.. Are you sure want to update selected ID?")){
            axios.put(`http://localhost:5000/api/user/${userID}`,user, {
            headers:{
                "token" : `Bearer ${sessionStorage.getItem("token")}`
            }
        })
        .then(res=>{
            window.location='/admin/find';
        }).catch(err=>{
            console.log(err);
        })
      }else{
        window.location='/admin/find';
      }    
    }

    return(
        <div className='update-div'>
            <div className='login-div-box'>
                <h1>UPDATE</h1>
                <form id='login-div-box-form' method='post' onSubmit={handleSubmit}>
                <input 
                    type='email'   
                    placeholder='Email' 
                    className='login-input'
                    ref={email}></input>

                <input 
                    type='password'   
                    placeholder='password' 
                    className='login-input'
                    ref={password}></input>
                <button className='update-account' type='submit'>UPDATE</button>
                </form>
                <p id='note-update'>Old values will be used for the entries left blank.</p>
            </div>
        </div>
    )
}

export default AdminUpdate;