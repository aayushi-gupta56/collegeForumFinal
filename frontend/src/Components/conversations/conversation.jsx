import React from "react";
import './conversation.css'

const Conversation=()=>{
    return(
        <div className="conversation">
                <img className="conversationImg" 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                    alt="" />
            <span className="conversationName">John Doe</span> 
        </div>
    )
}


export default Conversation