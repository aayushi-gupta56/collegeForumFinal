import React from "react";
import {BsGlobe} from 'react-icons/bs';
import './Components.css';
import {PF} from '../Pages/publicFolder'

const Header = ()=>{
    return(
        <div className="headerDiv">
            <div className="headerLogoImg">
                <img src={`${PF}CFLogo.png`} alt="Logo" className="headerLogo"></img>
            </div>
            <p className="headerTitle">College Forum.</p>
            <p className="headerLanguage">
                <BsGlobe className="headerIcon"/> 
                <h4>English</h4>
            </p>
        </div>
    )
}

export default Header;