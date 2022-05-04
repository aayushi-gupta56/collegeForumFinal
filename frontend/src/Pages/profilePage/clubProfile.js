import React, {useEffect, useState} from 'react'
import './profilePage.css'
import axios from 'axios'
import {PF, BF} from '../publicFolder';


const ProfilePage = ({current})=>{

    const path = window.location.pathname.split('/');
    const [profData, setProfile] = useState({})
    const urID = path[path.length-1];

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/clubs/profile/${urID}`,{
            headers:{
                "token" : `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(res=>{
            setProfile(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },[])

    //METHOD TO HANDLE CANCEL CHANGES
    const handleClose = ()=>{
        if(current.isAdmin==1)
            window.location = '/admin/find'
        else if(current.isClub===1)
            window.location = `/club/${current.userID}`
        else
            window.location = `/student/${current.userID}`
    }

    //METHOD TO HANDLE SAVE CHANGES
    const handleSubmit = (e)=>{
        e.preventDefault();
        
        const newUser = {
             name: e.target["name"].value,
             lead: e.target["lead"].value,
             department: e.target["department"].value,
             contact : e.target["contact"].value,
             faculty : e.target["faculty"].value,
             objective: e.target["objective"].value,
             alternate: e.target["alternate"].value
        }
        
            axios.put(`http://localhost:5000/api/clubs/profile/${urID}`, newUser, {
             headers : {
                 "token" : `Bearer ${sessionStorage.getItem("token")}`
             }
         }).then(res=>{
             document.getElementById('message').innerHTML = "SAVED.."
             setTimeout(()=>{
                 document.getElementById('message').innerHTML = ""
             }, 3000);

         }).catch(err=>{
             console.log(err);
        })
    }

    //METHOD TO HANDLE NEW PROFILE PICTURE
    const handleNewProfile = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("profile", e.target.files[0])
        axios.put(`http://localhost:5000/api/clubs/profile/picture/${urID}`, formData, {
            headers : {
                "token" : `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(res=>{
            window.location.reload();
        }).catch(err=>{
            console.log(err)
        })
    }


    return (
        <div className='wrap-outer'>
            <form className="signup-form" onSubmit={handleSubmit}>

                <div className="form-header">
                    <h1>ALL ABOUT {profData.name ? profData.name:profData.userID}</h1>
                    <div className='user-profile-image-div'>
                        <img className='user-profile-image' 
                            src={profData.profile? `${BF}${profData.profile}`:`${PF}unknown.png`} 
                            alt={profData.name}></img>
                        {current.userID===urID && <label htmlFor='profile' className='updateProfileLabel'>UPLOAD</label>}
                        {current.userID===urID && <input name="profile" type='file' className='updateProfileInput' onChange={handleNewProfile}/>}
                    </div>
                </div>

                <div className="form-body">

                <div className="form-group">
                    <label htmlFor="name" className="label-title">USERNAME</label>
                    <input type="text" id="name" className="form-input" placeholder="Enter your username" 
                        defaultValue={profData?.name} />
                </div>

                <div className="horizontal-group">
                    <div className="form-group left">
                        <label htmlFor="lead" className="label-title">LEAD</label>
                        <input type="text" id="lead" className="form-input" placeholder="Enter id for lead"
                            defaultValue={profData?.lead}/>
                    </div>

                    <div className="form-group right">
                        <label htmlFor="department" className="label-title">DEPARTMENT</label>
                        <input type="text" className="form-input" id="department" placeholder="Enter your department"
                            defaultValue={profData?.department}/>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="contact" className="label-title">CONTACT</label>
                    <input type="tel" id="contact" className="form-input" placeholder="Enter your mobile No."
                        defaultValue={profData?.contact}/>
                </div>

                <div className="form-group">
                    <label htmlFor="alternate" className="label-title">ALTERNATE CONTACT</label>
                    <input type="tel" id="alternate" className="form-input" placeholder="Enter your alternate mobile No."
                        defaultValue={profData?.alternate_Contact}/>
                </div>

                <div className="form-group">
                    <label htmlFor="faculty" className="label-title">FACULTY</label>
                    <input type="text" id="faculty" className="form-input" placeholder="Enter college faculty name"
                        defaultValue={profData?.faculty}/>
                </div>

                <div className="form-group">
                    <label htmlFor="objective" className="label-title">OBJECTIVE</label>
                    <textarea   type="date" id="objective" 
                                className="form-input" 
                                placeholder="Enter club objective"
                                style={{height:'80px'}}
                                defaultValue={profData?.objective}/>
                </div>

                </div>

                <div className="form-footer">
                    {current.userID===urID && <button type='submit' className='diff-btn'>SAVE CHANGES</button>}
                    <span id='message'></span>
                    <button type="button" className="profile-cancel-btn" onClick={handleClose}>CANCEL</button>
                </div>

            </form>
        </div>
    )    

}

export default ProfilePage;