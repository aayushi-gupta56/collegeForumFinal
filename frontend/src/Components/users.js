import React from "react";
import './Components.css'
import {BF, PF} from '../Pages/publicFolder'
import axios from 'axios'

const User = ({user})=>{

    const handleTimeline = ()=>{
        window.location = `/feed/${user.userID}`
    }

    const handleMem = ()=>{
        window.location = `/club/${user.userID}/members`
    }

    const handleProfile = ()=>{
        axios.get(`http://localhost:5000/api/user/find/${user.userID}`, {
            headers:{
                "token": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(res=>{
            if(res.isClub===1){

                window.location = `/clubs/profile/${user.userID}`

            }else{

                window.location = `/stud/profile/${user.userID}`

            }
        }).catch(err=>{
            console.log(err)
        })    
    }

    return (
        <div className="singleUser">
          <div className="singleUserLeft">
            <div className="singleUserProfile">
                <img src={user.profile ? `${BF}${user.profile}` : `${PF}unknown.png`} alt='' className="singleUserProfilePicture"/>
            </div>
            <div className="singleUserLeftText">
                <p className="singleName">{user?.name}</p>
                <p className="singleID">{user?.userID}</p>
            </div>
          </div>
          <div className="singleUserRight">
              <button className="singleUserRightBtn" onClick={handleProfile}>PROFILE</button>
              <button className="singleUserRightBtn" onClick={handleTimeline}>TIMELINE</button>
              {user.isClub===1 && <button className="singleUserRightBtn" onClick={handleMem}>MEMBERS</button>}
          </div>
      </div>
    );
}

export default User;