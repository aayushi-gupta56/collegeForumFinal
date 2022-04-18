import React from "react";
import Header from "../Components/header";
import Login from "../Components/login"
import Footer from "../Components/footer";
import './Pages.css';


const Main = ()=>{
    return(
        <div className="mainPage">
            <Header />
            <Login />
            <Footer />
        </div>
    );
}

export default Main;