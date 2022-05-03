import React, {useEffect, useState} from "react";
import './Components.css';
import axios from 'axios'
import {MdOutlineNotificationsActive} from 'react-icons/md';
import {FaUserAlt} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
import {PF, BF} from '../Pages/publicFolder'
import {format} from 'timeago.js'


const ProfileHeader = ({type})=>{
    const path = window.location.pathname.split('/')
    const userID = path[path.length-1];
    
    const [profData, setProfData] = useState(null);
    const [events, setEvents] = useState([]);
    const [clicked, setClicked] = useState(false)

    const toggleClick = ()=>{
        setClicked(!clicked)
        console.log(clicked)
    }

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

        axios.get(`http://localhost:5000/api/calendar/recents/${userID}`, {
            headers:{
                "token": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(results=>{
            setEvents(results.data);
        }).catch(err=>{
            console.log(err);
        })


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
                    <MdOutlineNotificationsActive id="notify" onClick={toggleClick}/>
                    {events.length!==0 && <div className={clicked? "notificationNumber hiddenNotif" : "notificationNumber"}>{events.length}</div>}
                    <div>
                        <ul className={clicked? "drop-menu visibleNotif" : "drop-menu"}>
                            {events.map(ev=>{
                                return(
                                    <li key={ev?.eid} className='drop-menu-item'>
                                        <p className="event">{ev?.event}</p>
                                        <p className="eventDate"> {format(ev?.event_Date)}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
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