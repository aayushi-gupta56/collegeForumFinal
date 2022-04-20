import React from "react";
import './Pages.css';
import Header from '../Components/header';
import ProfileHeader from "../Components/ProfileHeader";
import Footer from "../Components/footer";
import {PF} from "./publicFolder"

const StudentDashboard = ()=>{

    const handleFeed = ()=>{
        const path = window.location.pathname.split('/')
        window.location = `/feed/${path[path.length-1]}`
    }

    const handleCalendar = ()=>{
        window.location = '/calendar'
    }

    const handleSearchPosts = ()=>{
        window.location = '/search/posts'
    }

    const handleChat = ()=>{
        window.location = '/messenger'
    }

    return(
        <div>
            <Header />
            <ProfileHeader type="student"/>
            <div className="student-dashboard">
            <div className="dashboard-all">
                <div className="dashboard-posts" onClick={handleFeed}>
                    <img src={PF+"board-pin.png"} className="board-pin" alt=""></img>
                    <div id="dashboard-timeline" className="dashboard-images">
                        <img src={PF+"dashboard-feed.png"} alt="FEED"></img>
                    </div>
                    <p>TIMELINE</p>
                </div>
                <div className="dashboard-posts" onClick={handleCalendar}>
                    <img src={PF+"board-pin.png"} className="board-pin" alt=""></img>
                    <div id="dashboard-calendar" className="dashboard-images">
                        <img src={PF+"dashboard-calendar.png"} alt="CALENDAR"></img>
                    </div>
                    <p>CALENDAR</p>
                </div>
                <div className="dashboard-posts" onClick={handleChat}>
                    <img src={PF+"/board-pin.png"} className="board-pin" alt=""></img>
                    <div id="dashboard-chat" className="dashboard-images">
                        <img src={PF+"/dashboard-chat.png"} alt="CHAT"></img>   
                    </div>
                    <p>CHAT</p>
                </div>
                <div className="dashboard-posts">
                    <img src={PF+"/board-pin.png"} className="board-pin" alt=""></img>
                    <div id="dashboard-search-club" className="dashboard-images">
                        <img src={PF+"/dashboard-feed.png"} alt="CLUBS"></img>
                    </div>
                    <p>EXPLORE CLUBS</p>
                </div>
                <div className="dashboard-posts">
                    <img src={PF+"/board-pin.png"} className="board-pin" alt=""></img>
                    <div id="dashboard-search-people" className="dashboard-images">
                        <img src={PF+"/dashboard-feed.png"} alt="PEOPLE"></img>
                    </div>
                    <p>SEARCH FOR PEOPLE</p>
                </div>
                <div className="dashboard-posts" onClick={handleSearchPosts}>
                    <img src={PF+"/board-pin.png"} className="board-pin" alt=""></img>
                    <div id="dashboard-search-post" className="dashboard-images">
                        <img src={PF+"/dashboard-feed.png"} alt="POSTS"></img>
                    </div>
                    <p>LOOK FOR POSTS</p>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    );
}

export default StudentDashboard;