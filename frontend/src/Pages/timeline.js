import React from "react"
import Feed from "../Components/feed"
import Header from "../Components/header"
import './Pages.css';
import {PF} from './publicFolder'

const Timeline = ({curUser})=>{

    const timelineArray = ["Share what's on your mind..",
                        "Meet people from your own campus..",
                        "Build networks you missed online.."]
    const random = Math.floor((Math.random() * timelineArray.length));
    const splitArray = timelineArray[random].split(" ");

    const handleCreate = ()=>{
        const path = window.location.pathname.split('/')
        window.location = `/feed/create/${path[path.length-1]}`
    }

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
                    <img src={`${PF}unknown.png`}alt="Profile" className="profile-image"></img>
                </div>
            </div>
            <button className="timeline-create-post" onClick={handleCreate}>What's on your mind?</button>
            <Feed />
        </div>
    )
}

export default Timeline;