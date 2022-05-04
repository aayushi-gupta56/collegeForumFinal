import axios from "axios";
import React, { useEffect, useState } from "react";
import './Components.css'

const BackToDashboard = ({current})=>{
    const [profData, setProfData] = useState(null);

    const handleBack = ()=>{
        let c
        current.isClub===1 ? c='club' : current.isAdmin===1 ? c='admin' : c='student'
        window.location = `/${c}/${current.userID}`
    }

    useEffect(()=>{

        if(current.isClub===1){

            axios.get(`http://localhost:5000/api/clubs/profile/${current.userID}`, {
                headers : {
                    "token"  : `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(res=>{
                setProfData(res.data)
            }).catch(err=>{
                console.log(err);
            })

        }else if(current.isAdmin===0){

            axios.get(`http://localhost:5000/api/stud/profile/${current.userID}`, {
                headers : {
                    "token"  : `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(res=>{
                setProfData(res.data)
            }).catch(err=>{
                console.log(err);
            })

        }

    },[])

    return(
        <div className="messengerHeader">
            <button className="messengerHeaderBtn" onClick={handleBack}>BACK</button>
            <p className="messengerWelcome">Your Messages{profData?.name && `, ${profData?.name}`} !</p> 
        </div>
    )
}

export default BackToDashboard;