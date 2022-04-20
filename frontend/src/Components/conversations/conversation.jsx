import axios from "axios";
import React, { useEffect, useState } from "react";
import { PF } from "../../Pages/publicFolder";
import './conversation.css'

const Conversation=({conversation, currentUser})=>{
    const [user, setUser] = useState(null);

    useEffect(()=>{

        const friendID = (conversation.memId_1 === currentUser.userID)? conversation.memId_2 : conversation.memId_1
        axios.get(`http://localhost:5000/api/user/find/${friendID}`,{
            headers : {
                "token" : `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(res=>{
            if(res.data.isClub===1){
                
                axios.get(`http://localhost:5000/api/clubs/profile/${friendID}`,{
                    headers : {
                        "token" : `Bearer ${sessionStorage.getItem("token")}`
                    }
                }).then(result=>{
                    setUser(result.data);
                }).catch(err=>{
                    console.log(err);
                })

            }else{

                axios.get(`http://localhost:5000/api/stud/profile/${friendID}`,{
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


    }, [currentUser, conversation])

    return(
        <div className="conversation">
                <img className="conversationImg" 
                    src={user?.profile? user.profile : `${PF}unknown.png`}
                    alt="" />
            <span className="conversationName">{user?.name}</span> 
        </div>
    )
}


export default Conversation