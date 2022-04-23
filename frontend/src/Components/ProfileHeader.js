import React, {useEffect, useState} from "react";
import './Components.css';
import axios from 'axios'
import {MdOutlineNotificationsActive} from 'react-icons/md';
import {FaUserAlt} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
import {PF, BF} from '../Pages/publicFolder'


const ProfileHeader = ({type})=>{
    const path = window.location.pathname.split('/')
    const userID = path[path.length-1];
    
    const [profData, setProfData] = useState(null);

    useEffect(()=>{

        if(type==='club'){

            axios.get(`http://localhost:5000/api/clubs/profile/${userID}`, {
                headers : {
                    "token" : `Bearer ${sessionStorage.getItem('token')}`
                }
            }).then(res=>{
                setProfData(res.data);
            }).catch(err=>{
                console.log(err);
            })

        }else if(type==='student'){

            axios.get(`http://localhost:5000/api/stud/profile/${userID}`, {
                headers : {
                    "token" : `Bearer ${sessionStorage.getItem('token')}`
                }
            }).then(res=>{
                setProfData(res.data);
            }).catch(err=>{
                console.log(err);
            })

        }


    },[])

    const handleProfile = ()=>{
        if(type==='student')
            window.location = `/stud/profile/${userID}`
        if(type==='club')
            window.location = `/clubs/profile/${userID}`
    }

    const handleLogout = ()=>{
        sessionStorage.clear();
        window.location =  '/';
    }

    return(
        <div className="profile-header">
            <div className="profile-header-image">
                <img src={profData?.profile? `${BF}${profData.profile}` : `${PF}/unknown.png`} alt="Profile"></img>
            </div>
            <div className="profile-header-stat">
                <p>WELCOME{profData?.name && `, ${profData?.name}`} !</p>
            </div>
            <div className="profile-header-feature">
                <div className="notify-feature">
                    <MdOutlineNotificationsActive id="notify"/>
                </div>
                <div className="profile-feature" onClick={handleProfile}>
                    <FaUserAlt id="profile"/>
                </div> 
                <div className="logout-feature" onClick={handleLogout}>
                    <FiLogOut id="logout"/>
                </div> 
            </div>
        </div>
    );
}

export default ProfileHeader;