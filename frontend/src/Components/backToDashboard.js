import React from "react";
import './Components.css'

const BackToDashboard = ({current})=>{

    const handleBack = ()=>{
        let c
        current.isClub===1 ? c='club' : current.isAdmin===1 ? c='admin' : c='stud'
        window.location = `/${c}/${current.userID}`
    }

    return(
        <div className="backToDasboard">
            <button className="dashboardButton" onClick={handleBack}>DASHBOARD</button>
        </div>
    )
}

export default BackToDashboard;