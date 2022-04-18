import React, { useReducer } from "react";
import AuthContext from './authContext'
import authReducer from "./authReducer";
import {login, logout} from './authActions'

const AuthState = (props)=>{
    const initial = {
        userID:"",
        email:"",
        isAdmin:0,
        isClub:0,
        AccessToken:""
    }

    const [state, dispatch] = useReducer(authReducer, initial);

    const loginFunc = (userInfo)=>{
        dispatch({
            type: login,
            payload : userInfo 
        })
    }

    const logoutFunc = ()=>{
        dispatch({
            type: logout,
            payload: initial
        })
    }

    return(
        <AuthContext.Provider value={{
            user:state, loginFunc, logoutFunc 
        }}>
            {props.children}   
        </AuthContext.Provider>
    )
}

export default AuthState