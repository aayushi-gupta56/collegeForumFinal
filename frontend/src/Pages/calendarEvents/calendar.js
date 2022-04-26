import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { NewEventModal } from './NewEventModal'
import { DeleteEventModal } from './DeleteEventModal'
import axios from 'axios'
import './calendar.css'

const Calendar = ()=>{
    const path = window.location.pathname.split('/')
    const uid = path[path.length-1]
    const [data,setData] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [title, setTitle] = useState('');
    const [clickEvent, setClickEvent] = useState(null);
    const [isDelete, setDelete] = useState(false);
    const [deleteEvent, setDeleteEvent] = useState(null);

    const handleDateClick = (e)=>{
        setClicked(true);
        setClickEvent(e);
    }

    const handleDelete = ()=>{
        axios.delete(`http://localhost:5000/api/calendar/${uid}/${deleteEvent.publicId}`,{
            headers : {
                "token": `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(res=>{
            axios.get(`http://localhost:5000/api/calendar/${uid}`,{
                    headers: {
                        "token"  : `Bearer ${sessionStorage.getItem("token")}`
                    }
            }).then(result=>{
                const ans = result.data.map((e)=>{
                    const d = new Date(e.event_Date);
                    const obj = {
                        id: e.eid,
                        title: e.event,
                        start: d,
                        allDay: true 
                    }
                    return obj;
                })
                setData([...ans]);
            }).catch(err=>{
                console.log(err);
            })
    
        }).catch(err=>{
            console.log(err);
        })
        setDelete(false);
        setDeleteEvent(null);
    }

    const handleEventClick = (e)=>{
        setDelete(true);
        setDeleteEvent(e.event._def);
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/calendar/${uid}`,{
            headers: {
                "token"  : `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(result=>{
            const ans = result.data.map((e)=>{
                const d = new Date(e.event_Date);
                const obj = {
                    id: e.eid,
                    title: e.event,
                    start: d,
                    allDay: true 
                }
                return obj;
            })
            setData([...ans]);
        }).catch(err=>{
            console.log(err);
        })    
    },[])

    useEffect(()=>{
        if(title!==''){
            const event = {
                "event": title,
                "event_Date": clickEvent.dateStr
            }
            axios.post(`http://localhost:5000/api/calendar/${uid}`,event,{
                headers: {
                    "token" : `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(res=>{


                axios.get(`http://localhost:5000/api/calendar/${uid}`,{
                    headers: {
                        "token"  : `Bearer ${sessionStorage.getItem("token")}`
                    }
                }).then(result=>{
                    const ans = result.data.map((e)=>{
                        const d = new Date(e.event_Date);
                        const obj = {
                            id: e.eid,
                            title: e.event,
                            start: d,
                            allDay: true 
                        }
                        return obj;
                    })
                    setData([...ans]);
                }).catch(err=>{
                    console.log(err);
                })


            }).catch(err=>{
                console.log(err);
            })

            setTitle('');
            setClickEvent(null);
        }
    },[title])

    return(
        <div className='calendar-div-wrap'>
            <div className='calendar-div'>
                <FullCalendar
                    events={data} 
                    plugins={[dayGridPlugin, interactionPlugin]} 
                    height='80vh' 
                    dateClick={handleDateClick}
                    eventClick={(e)=>handleEventClick(e)}
                />
            </div>
            {
                clicked &&
                <NewEventModal
                    onClose={() =>{
                        setClicked(false);
                        setClickEvent(null);
                    }}
                    onSave={title => {
                        setTitle(title);
                        setClicked(false);
                    }}/>
            }
            {
                isDelete &&
                <DeleteEventModal 
                eventText={deleteEvent?.title}
                onClose={() => {
                    setDelete(false);
                    setDeleteEvent(null);
                }}
                onDelete={handleDelete}/>
            } 
        </div>
    )
}

export default Calendar;