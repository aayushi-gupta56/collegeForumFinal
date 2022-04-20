import React, { useState } from 'react'
import './Message.css'
import {format} from 'timeago.js'
import axios from 'axios';
import { PF } from '../../Pages/publicFolder';

export default function Message({message,own}){
    const [user, setUser] = useState(null);
    axios.get(`http://localhost:5000/api/user/find/${message.senderId}`,{
        headers : {
            "token": `Bearer ${sessionStorage.getItem("token")}`
        }
    }).then(res=>{

        if(res.data.isClub){
            
            axios.get(`http://localhost:5000/api/clubs/profile/${message.senderId}`, {
                headers : {
                    "token" : `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(result=>{
                setUser(result.data);
            }).catch(err=>{
                console.log(err);
            })

        }else if(res.data.isAdmin===0){

            axios.get(`http://localhost:5000/api/stud/profile/${message.senderId}`, {
                headers : {
                    "token" : `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(result=>{
                setUser(result.data);
            }).catch(err=>{
                console.log(err);
            })  

        }

    }).catch(err=>{
        console.log(err);
    })

    return(
        <div className={own? "message own" : "message"}>
            <div className="messageTop">
                <img 
                    src={user?.profile? user.profile : `${PF}unknown.png`}
                    alt="" 
                    className='messageImg'/>
                <p className='messageText'>{message.msg}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}