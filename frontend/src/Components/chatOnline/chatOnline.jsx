import axios from 'axios'
import React, { useState } from 'react'
import { PF } from '../../Pages/publicFolder'
import './chatOnline.css'

export default function ChatOnline({online}){
    const onlineUserId = online.userID
    const [userData, setUserData] = useState(null)

    axios.get(`http://localhost:5000/api/user/find/${onlineUserId}`,{
        headers: {
            "token": `Bearer ${sessionStorage.getItem("token")}`
        }
    }).then(res=>{
        if(res.data.isClub===1){

            axios.get(`http://localhost:5000/api/clubs/profile/${onlineUserId}`, {
                headers: {
                    "token": `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(result=>{
                setUserData(result.data);
            }).catch(err=>{
                console.log(err);
            })

        }else{

            axios.get(`http://localhost:5000/api/stud/profile/${onlineUserId}`, {
                headers: {
                    "token": `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(result=>{
                setUserData(result.data);
            }).catch(err=>{
                console.log(err);
            })
        }
    }).catch(err=>{
        console.log(err);
    })

    return(
        <div className='chatOnline'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className='chatOnlineImg' 
                        src={userData?.profile ? userData.profile : `${PF}unknown.png`} 
                        alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">{userData?.name}</span>
            </div>
        </div>
    )
}