import React, { useEffect, useRef, useState } from 'react'
import Conversation from '../../Components/conversations/conversation'
import Header from '../../Components/header'
import BackToDashboard from '../../Components/backToDashboard'
import Message from '../../Components/message/Message'
import ChatOnline from '../../Components/chatOnline/chatOnline'
import {io} from "socket.io-client"
import './messenger.css'
import axios from 'axios'

const Messenger = ({current})=>{
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineChat, setOnlineChat] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();


     /*-----------------------------------USE EFFECT FOR GETTING ALL THE CONVERSATIONS OF USER ON WINDOW RELOAD-----------------------------------*/
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/convo/${current.userID}`)
        .then(res=>{
            setConversations(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },[conversations])


     /*-----------------------------------USE EFFECT FOR CHANGING MESSAGES BOX WHENEVER CURRENT CHAT CHANGES-----------------------------------*/
    useEffect(()=>{

        axios.get(`http://localhost:5000/api/msg/${currentChat?.cid}`)
        .then(res=>{
            setMessages(res.data);
        }).catch(err=>{
            console.log(err);
        })

    },[currentChat])


    /*-----------------------------------USE EFFECT FOR SCROLLING TO CURRENT MESSAGE IN CHAT BOX WHENEVER MESSAGES ARRAY CHANGES-----------------------------------*/
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior : "smooth"})
    },[messages])


     /*-----------------------------------USE EFFECT FOR SOCKET.IO-----------------------------------*/
     useEffect(()=>{
        socket.current = io("ws://localhost:8900")
     },[])

    useEffect(()=>{
        socket.current.emit("addUser", current.userID)
        socket.current.on("getUsers", online=>{
            setOnlineChat(online);
        })
    },[current])

    useEffect(()=>{
        socket.current.on("getMessage",(data)=>{
            setArrivalMessage({
                senderId: data.senderId,
                msg: data.text,
                createdAt: Date.now()
            })
        })
    },[])

    useEffect(()=>{
        arrivalMessage && (currentChat?.memId_1===arrivalMessage.senderId || currentChat?.memId_2===arrivalMessage.senderId) &&
        setMessages((prev)=>[...prev, arrivalMessage])
    },[arrivalMessage, current])



    const handleSend = (e)=>{
        e.preventDefault();
        const sendMessage = {
            cid : currentChat.cid,
            sender : current.userID,
            text : newMessage
        }

        const recieverId = currentChat?.memId_1===current.userID ? currentChat.memId_2 : currentChat.memId_1

        socket.current.emit("sendMessage", {
            senderId : current.userID,
            recieverId,
            text: newMessage
        })

        setNewMessage("");

        axios.post('http://localhost:5000/api/msg', sendMessage)
        .then(res=>{
            setMessages([...messages,res.data]);
        }).catch(err=>{
            console.log(err);
        })
    }

    const handleNewConversation = (friend)=>{
        
        axios.get(`http://localhost:5000/api/convo/find/${current.userID}/${friend.userID}`)
        .then(res=>{
            if(res.data.length!==0)
                setCurrentChat(res.data[0])
            else{
                axios.post(`http://localhost:5000/api/convo/`,{
                    senderId: current.userID,
                    recieverId: friend.userID
                }).then((result)=>{
                    axios.get(`http://localhost:5000/api/convo/find/${current.userID}/${friend.userID}`)
                    .then(newRes=>{
                        setCurrentChat(newRes.data[0]);
                    })
                })
            }
        })

    }

    return(
        <>
            <Header/>
            <BackToDashboard current={current}/>
            <div className='messenger'>
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder='Search for friends' className='chatMenuInput'/>
                        {conversations.map((c, index)=>{
                            return <div key={index} onClick={()=>setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={current}/>
                            </div>
                        })}
                    </div>
                </div>
                <div className="chatBox">
                    
                        {
                            currentChat ?
                                <div className="chatBoxWrapper">
                                    <div className="chatBoxTop">
                                        {messages.map(m=>{
                                            return <div ref={scrollRef} key={m.mid}>
                                                <Message message={m} own={m.senderId===current.userID}/>
                                            </div>
                                        })}
                                    </div>
                                    <div className="chatBoxBottom">
                                        <textarea 
                                            className="chatMessageInput" 
                                            placeholder='Talk about something..'
                                            value={newMessage}
                                            onChange={(e)=>setNewMessage(e.target.value)}></textarea>
                                        <button className='chatSubmitButton' onClick={handleSend}>SEND</button>
                                    </div>
                                </div> : <span className='noConversationText'>Open a conversation to start chatting</span>
                        }    
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        {onlineChat.map((friend)=>{
                            return <div key={friend.userID} onClick={()=>handleNewConversation(friend)}>
                                {current.userID!==friend.userID && <ChatOnline online={friend}/>}
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger;