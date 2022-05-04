import React, {useEffect, useState} from 'react'
import './profilePage.css'
import axios from 'axios'
import {PF, BF} from '../publicFolder';


const ProfilePage = ({current})=>{

    const path = window.location.pathname.split('/');
    const [profData, setProfile] = useState({})
    const urID = path[path.length-1];

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/stud/profile/${urID}`,{
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
        if(current.isAdmin===1)
            window.location = '/admin/find'
        else if(current.isClub===1)
            window.location = `/club/${current.userID}/members`
        else
            window.location = `/student/${current.userID}`
    }

    //METHOD TO HANDLE SAVE CHANGES
    const handleSubmit = (e)=>{
        e.preventDefault();
        
        const newUser = {
             name: e.target["name"].value,
             class: e.target["class"].value,
             department: e.target["department"].value,
             contact : e.target["contact"].value,
             hostel : e.target["hostel"].value,
             dob: new Date(e.target["dob"].value)
        }
        
            axios.put(`http://localhost:5000/api/stud/profile/${urID}`, newUser, {
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
        axios.put(`http://localhost:5000/api/stud/profile/picture/${urID}`, formData, {
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
                        defaultValue={profData?.name} disabled={current.userID===urID ? null : 'disabled'}/>
                </div>

                <div className="horizontal-group">
                    <div className="form-group left">
                        <label htmlFor="class" className="label-title">CLASS</label>
                        <input type="text" id="class" className="form-input" placeholder="Enter your class"
                            defaultValue={profData?.class} disabled={current.userID===urID ? null : 'disabled'}/>
                    </div>

                    <div className="form-group right">
                        <label htmlFor="department" className="label-title">DEPARTMENT</label>
                        <input type="text" className="form-input" id="department" placeholder="Enter your department"
                            defaultValue={profData?.department} disabled={current.userID===urID ? null : 'disabled'}/>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="contact" className="label-title">CONTACT</label>
                    <input type="tel" id="contact" className="form-input" placeholder="Enter your mobile No."
                        defaultValue={profData?.contact} disabled={current.userID===urID ? null : 'disabled'}/>
                </div>

                <div className="form-group">
                    <label htmlFor="hostel" className="label-title">HOSTEL</label>
                    <input type="text" id="hostel" className="form-input" placeholder="Enter your hostel"
                        defaultValue={profData?.hostel} disabled={current.userID===urID ? null : 'disabled'}/>
                </div>

                <div className="form-group">
                    <label htmlFor="dob" className="label-title">DATE OF BIRTH</label>
                    <input type="date" id="dob" className="form-input" placeholder="Enter your DOB"
                        defaultValue={profData.dob?.split('T')[0]} disabled={current.userID===urID ? null : 'disabled'}/>
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