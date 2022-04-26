import React from 'react'
import Header from '../Components/header'
import ProfileHeader from '../Components/ProfileHeader'
import './Pages.css'
import {PF} from "./publicFolder"

const ClubDashboard = ()=>{

    const handleMem = ()=>{
        window.location = window.location.pathname + '/members'
    }

    const handleFeed = ()=>{
        const path = window.location.pathname.split('/')
        window.location = `/feed/${path[path.length-1]}`
    }

    const handleCalendar = ()=>{
        window.location = '/calendar'
    }

    const handleChat = ()=>{
        window.location = '/messenger'
    }

    return(
        <div>
            <Header />
            <ProfileHeader type="club"/>
            <div className='club-dashboard'>
                <div className='dashboard-all gridOfTwo'>
                    <div className="dashboard-posts" onClick={handleMem}>
                        <img src={`${PF}board-pin.png`} className="board-pin" alt=""></img>
                        <div id="dashboard-timeline" className="dashboard-images">
                            <img src={`${PF}clubMem.png`} alt="MEMBERS"></img>
                        </div>
                        <p>MEMBERS</p>
                    </div>
                    <div className="dashboard-posts" onClick={handleCalendar}>
                        <img src={`${PF}board-pin.png`} className="board-pin" alt=""></img>
                        <div id="dashboard-calendar" className="dashboard-images">
                            <img src={`${PF}dashboard-calendar.png`} alt="CALENDAR"></img>
                        </div>
                        <p>CALENDAR</p>
                    </div>
                    <div className="dashboard-posts" onClick={handleChat}>
                        <img src={`${PF}board-pin.png`} className="board-pin" alt=""></img>
                        <div id="dashboard-chat" className="dashboard-images">
                            <img src={`${PF}dashboard-chat.png`} alt="CHAT"></img>   
                        </div>
                        <p>CHAT</p>
                    </div>
                    <div className="dashboard-posts" id="feedGrid" onClick={handleFeed}>
                    <img src={PF+"board-pin.png"} className="board-pin" alt=""></img>
                    <div id="dashboard-timeline" className="dashboard-images">
                        <img src={PF+"dashboard-feed.png"} alt="FEED"></img>
                    </div>
                    <p>TIMELINE</p>
                </div>
                </div>
            </div>
        </div>
    )
}


export default ClubDashboard;