import React from "react";
import Header from "../Components/header";
import Footer from '../Components/footer';
import AdminDashboardHeader from "../Components/adminDashboardHeader";
import './Pages.css';
import {PF} from './publicFolder'

const AdminDashboard = ()=>{

    const handleViewAll = ()=>{
        window.location = '/admin/find'
    }

    const handleLogout = ()=>{
        sessionStorage.clear();
        window.location =  '/';
    }

    const handleRegister = ()=>{
        window.location = '/register'
    }

    return(
        <div>
            <Header />
            <AdminDashboardHeader/>
            <div className="admin-dashboard">
                <div className="dashboard-all">
                <div className="dashboard-posts" onClick={handleRegister}>
                    <img src={`${PF}board-pin.png`} className="board-pin" alt=""></img>
                    <div id="dashboard-calendar" className="dashboard-images">
                        <img src={`${PF}addData.png`} alt="CALENDAR"></img>
                    </div>
                    <p>ADD A NEW STUDENT</p>
                </div>
                <div className="dashboard-posts" onClick={handleViewAll}>
                    <img src={`${PF}board-pin.png`} className="board-pin" alt=""></img>
                    <div id="dashboard-timeline" className="dashboard-images">
                        <img src={`${PF}viewData.png`} alt="FEED"></img>
                    </div>
                    <p>VIEW ALL USERS</p>
                </div>

                <div className="dashboard-posts" onClick={handleLogout}>
                    <img src={`${PF}board-pin.png`} className="board-pin" alt=""></img>
                    <div id="dashboard-timeline" className="dashboard-images">
                        <img src={`${PF}logoutAdmin.png`} alt="FEED"></img>
                    </div>
                    <p>LOGOUT</p>
                </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminDashboard;