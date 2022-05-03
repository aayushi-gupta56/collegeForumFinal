import React, { useEffect, useState } from 'react'
import Header from '../../Components/header'
import { PF, BF } from '../publicFolder';
import { MdOutlineDelete } from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'
import axios from 'axios'
import './memberPage.css'

const MemberPage = ({current})=>{
    const[errorText, setErrorText] = useState("");
    const [members, setMembers] = useState([])
    const path = window.location.pathname.split('/')
    const club = path[path.length-2]

    useEffect(()=>{

        axios.get(`http://localhost:5000/api/clubs/members/${club}`)
        .then(res=>{
            setMembers(res.data)
        }).catch(err=>{
            console.log(err)
        })

    }, [])

    const handleBack = ()=>{
        if(current.isClub===1)
            window.location = `/club/${current.userID}`
        else if(current.isAdmin===1)
            window.location = `/admin/${current.userID}`
        else
            window.location = `/student/${current.userID}`
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const member = {
            memID: e.target.memID.value,
            position: e.target.position.value
        }

        axios.post(`http://localhost:5000/api/clubs/members/${club}`, member, {
            headers: {
                "token" : `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(res=>{

            e.target.memID.value = ""
            e.target.position.value = ""
            setErrorText(res.data)

            setTimeout(()=>{
                setErrorText("")
                window.location.reload();
            }, 4000)

        }).catch(err=>{
            if(err.response.status===400)
                setErrorText(err.response.data)
            else
                console.log(err);
        })
    }

    return (
        <div className='memberPage'>
            <Header/>
            <div className='memberList'>
                <button className='dashboard-btn-members' onClick={handleBack}>DASHBOARD</button>
                {current.userID===club && <div className='singleMember'>
                    <div className='memberImgDiv'>
                        <img src={`${PF}unknown.png`} className='memberImg'/>
                    </div>
                    <form className='newMember' onSubmit={handleSubmit}>
                        <input type="text" name='memID' className='newMemberInput topInput' placeholder='USER-ID' required/>
                        <input type="text" name='position' className='newMemberInput' placeholder='POSITION' required/>
                        <span className='newErrorText'>{errorText}</span>
                        <button type='submit' className='newMemBtn'>ADD MEMBER</button>
                    </form>
                </div>}
                {members.map((element)=>{
                    return(
                        <div className='singleMember'>
                            <div className='memberImgDiv'>
                                <img src={element.profile ? `${BF}${element.profile}` : `${PF}unknown.png`} className='memberImg'/>
                            </div>
                            <div className='memberAbout'>
                                <p className='aboutName'>{element.name}</p>
                                <p className='aboutID'>{element.userID}</p>
                                <p className='aboutPOS'>{element.position}</p>
                            </div>
                            <div className='memberLinks'>
                                {current.userID===club && <div className='deleteLink'>
                                    <MdOutlineDelete/>
                                    <p>Delete</p>
                                </div>}
                                <div className={current.userID===club ? 'viewLink' : 'viewLink centerLink'}>
                                    <AiOutlineEye/>
                                    <p>View</p>
                                </div>   
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default MemberPage;