import React from 'react'
import Conversation from '../../Components/conversations/conversation'
import Header from '../../Components/header'
import Message from '../../Components/message/Message'
import ChatOnline from '../../Components/chatOnline/chatOnline'
import './messenger.css'

const Messenger = ()=>{
    return(
        <>
            <Header/>
            <div className='messenger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder='Search for friends' className='chatMenuInput'/>
                        <Conversation/>
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                            <Message/>
                            <Message own={true}/>
                            <Message/>
                            <Message/>
                            <Message own={true}/>
                            <Message/>
                            <Message own={true}/>
                            <Message/>
                            <Message/>
                            <Message/>
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" placeholder='Talk about something..'></textarea>
                            <button className='chatSubmitButton'>SEND</button>
                        </div>
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline/>   
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger;