import React, {useContext} from "react";
import './Components.css';
import {MdOutlineNotificationsActive} from 'react-icons/md';
import {FaUserAlt} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
import {PF} from '../Pages/publicFolder'


const ProfileHeader = ({type})=>{

    const path = window.location.pathname.split('/')
    const userID = path[path.length-1];

    const handleProfile = ()=>{
        if(type==='student')
            window.location = `/stud/profile/${userID}`
    }

    const handleLogout = ()=>{
        sessionStorage.clear();
        window.location =  '/';
    }

    return(
        <div className="profile-header">
            <div className="profile-header-image">
                <img src={`${PF}/unknown.png`} alt="Profile"></img>
            </div>
            <div className="profile-header-stat">
                {/* <div>
                    <p id="stat-posts">9</p>
                    <p>POSTS</p>
                </div>
                <div>
                    <p id="stat-following">29</p>
                    <p>FOLLOWING</p>
                </div>
                <div>
                    <p id="stat-followers">19</p>
                    <p>FOLLOWERS</p>
                </div> */}
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