import axios from "axios";
import React, { useEffect, useState } from "react"
import Feed from "../Components/feed"
import Header from "../Components/header"
import './Pages.css';
import {PF, BF} from './publicFolder'

const Timeline = ({curUser})=>{

    const path = window.location.pathname.split('/')
    const getInfoAbout = path[path.length-1]
    const [profile, setProfile] = useState('');


    //FUNCTION TO GET PROFILE PICTURE ONLY CALLED ON WINDOW RELOAD AS WE HAVE EMPTY DEPENDENCY ARRAY
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/user/find/${getInfoAbout}`, {
            headers : {
                "token" : `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then((res)=>{

            if(res.data.isClub===1){
                axios.get(`http://localhost:5000/api/clubs/profile/${getInfoAbout}`, {
                    headers:{
                        "token" : `Bearer ${sessionStorage.getItem("token")}`
                    }
                }).then(result=>{
                    setProfile(result.data.profile);
                }).catch(err=>{
                    console.log(err);
                })
            }else if(res.data.isAdmin!==1){

                    axios.get(`http://localhost:5000/api/stud/profile/${getInfoAbout}`, {
                        headers:{
                            "token" : `Bearer ${sessionStorage.getItem("token")}`
                        }
                    }).then(result=>{
                        setProfile(result.data.profile);
                    }).catch(err=>{
                        console.log(err);
                    })

            }

        }).catch(err=>{
            console.log(err);
        })
    }, [])


    //TIMELINE ANIMATION ARRAY CALLED ON WINDOW RELOAD
    const timelineArray = ["Share what's on your mind..",
                        "Meet people from your own campus..",
                        "Build networks you missed online.."]
    const random = Math.floor((Math.random() * timelineArray.length));
    const splitArray = timelineArray[random].split(" ");


    //FUNCTION EXECUTED ON CLICKING WHAT'S ON YOUR MIND BUTTON
    const handleCreate = ()=>{
        window.location = `/feed/create/${getInfoAbout}`
    }

    //HOME BUTTON
    const handleHome = ()=>{
        if(curUser.isAdmin)
            window.location = `/admin/${curUser.userID}`
        else if(curUser.isClub)
            window.location = `/club/${curUser.userID}`
        else
            window.location = `/student/${curUser.userID}`
    }

    return (
        <div className="timeline-div">
            <Header/>
            <div className="timeline-display">
                <div className="typing-wrapper">
                <div className="typing">
                    <p><b
                    style={{color:"#FFBF00", fontSize:"50px"}}>{splitArray[0]}</b>{timelineArray[random].slice(splitArray[0].length)}</p>
                </div>
                </div>
                <button className='home-btn' onClick={handleHome}>HOME</button> 
                <div className="profile-image-div">
                    <img src={profile? `${BF}${profile}` : `${PF}unknown.png`}alt="Profile" className="profile-image"></img>
                </div>
            </div>
            {curUser.userID===getInfoAbout && <button className="timeline-create-post" onClick={handleCreate}>What's on your mind?</button>}
            <Feed current={curUser}/>
        </div>
    )
}

export default Timeline;