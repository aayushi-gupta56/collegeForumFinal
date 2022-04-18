import React from 'react'
import './Message.css'

export default function Message({own}){
    return(
        <div className={own? "message own" : "message"}>
            <div className="messageTop">
                <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                    alt="" 
                    className='messageImg'/>
                <p className='messageText'>Hello this is a message.</p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div>
    )
}