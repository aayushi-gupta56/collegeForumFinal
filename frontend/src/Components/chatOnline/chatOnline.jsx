import React from 'react'
import './chatOnline.css'

export default function ChatOnline(){
    return(
        <div className='chatOnline'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className='chatOnlineImg' 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                        alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">John Doe</span>
            </div>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className='chatOnlineImg' 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                        alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">John Doe</span>
            </div>
        </div>
    )
}