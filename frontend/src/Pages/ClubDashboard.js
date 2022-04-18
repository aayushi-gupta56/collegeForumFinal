import React from 'react'
import Header from '../Components/header'
import ProfileHeader from '../Components/ProfileHeader'
import Footer from '../Components/footer'
import './Pages.css'
import {PF} from "./publicFolder"

const ClubDashboard = ()=>{

    const handleFeed = ()=>{
        const path = window.location.pathname.split('/')
        window.location = `/feed/${path[path.length-1]}`
    }

    const handleCalendar = ()=>{
        window.location = '/calendar'
    }

    return(
        <div>
            <Header />
            <ProfileHeader type="club"/>
            <div className='club-dashboard'>
                <div className='dashboard-all'>
                    <div className="dashboard-posts">
                        <img src={`${PF}board-pin.png`} className="board-pin" alt=""></img>
                        <div id="dashboard-timeline" className="dashboard-images">
                            <img src={`${PF}clubMem.png`} alt="FEED"></img>
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
                    <div className="dashboard-posts">
                        <img src={`${PF}board-pin.png`} className="board-pin" alt=""></img>
                        <div id="dashboard-chat" className="dashboard-images">
                            <img src={`${PF}dashboard-chat.png`} alt="CHAT"></img>   
                        </div>
                        <p>CHAT</p>
                    </div>
                    <div className="dashboard-posts" onClick={handleFeed}>
                    <img src={PF+"board-pin.png"} className="board-pin" alt=""></img>
                    <div id="dashboard-timeline" className="dashboard-images">
                        <img src={PF+"dashboard-feed.png"} alt="FEED"></img>
                    </div>
                    <p>TIMELINE</p>
                </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


export default ClubDashboard;