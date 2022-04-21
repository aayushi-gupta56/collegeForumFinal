import React, { useState } from "react";
import "./adminAddUser.css"
import axios from 'axios'
import { AiOutlineUser,AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { GrUserAdmin,GrGroup } from 'react-icons/gr'


const AdminAddUser = ({current})=>{
    const [errorText, setErrorText] = useState("");
    const [lower, setLower] = useState(false);
    const [upper, setUpper] = useState(false);
    const [digit, setDigit] = useState(false);
    const [special, setSpecial] = useState(false);
    const [length, setLength] = useState(false);

    const areDetailsValid = (user)=>{
        const decimal =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

        if(user.userID.length !== 10){
            setErrorText("NOT A VALID USER-ID")
            return false
        }

        if(user.email.indexOf('@') >= user.email.indexOf('.')){
            setErrorText("NOT A VALID EMAIL")
            return false
        }

        if(!user.password.match(decimal)){
            setErrorText("NOT A VALID PASSWORD")
            return false
        }

        return true

    }

    const handleBack = ()=>{
        window.location = `/admin/${current}`
    }

    const handleChange = (e)=>{
        const lowerPattern = /[a-z]/g
        const upperPattern = /[A-Z]/g 
        const digitPattern = /[0-9]/g
        const specialPattern = /[!@#\$%\^&\*]/g
        const lengthPattern = [8, 15]

        if(e.target.value.match(lowerPattern))
            setLower(true);
        else
            setLower(false);

        if(e.target.value.match(upperPattern))
            setUpper(true);
        else
            setUpper(false);

        if(e.target.value.match(digitPattern))
            setDigit(true);
        else
            setDigit(false);

        if(e.target.value.match(specialPattern))
            setSpecial(true);
        else
            setSpecial(false);

        if(e.target.value.length>=lengthPattern[0] && e.target.value.length<=lengthPattern[1])
            setLength(true);
        else
            setLength(false);
        
    }

    const handleRegister = (e)=>{
        e.preventDefault();
        const user = {
            userID: e.target.userId.value,
            email: e.target.email.value,
            password: e.target.password.value,
            isAdmin: e.target.isAdmin.checked,
            isClub: e.target.isClub.checked
        }

        if(areDetailsValid(user)){
            
            axios.post("http://localhost:5000/api/auth/register", user,{
                headers:{
                    "token" : `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(res=>{
                e.target.userId.value = ""
                e.target.email.value= ""
                e.target.password.value = ""
                e.target.isAdmin.checked = false
                e.target.isClub.checked = false
                setErrorText("USER ADDED SUCCESSFULLY");

                setTimeout(()=>{
                    setErrorText("")
                }, 3000)

            }).catch(err=>{
                if(err.response.status===400)
                    setErrorText(err.response.data);
                else
                    console.log(err);
            })
        }
    }

    return (
        <div className="RegisterContainer">
	        <form className="RegisterForm" onSubmit={handleRegister}>
		        <div className="Registerfield" tabIndex="1">
			        <label htmlFor="userId">
				        <AiOutlineUser className="RegisterIcons"/> USER-ID
			        </label>
			        <input name="userId" type="text" placeholder="Enter unique ID" required className="textInput"/>
		        </div>
		        <div className="Registerfield" tabIndex="2">
			        <label htmlFor="email">
                        <AiOutlineMail className="RegisterIcons"/>EMAIL
                    </label>
                    <input name="email" type="text" placeholder="email@domain.com" required className="textInput"/>
                </div>
                <div className="Registerfield passwordRegisterField" tabIndex="3">
                    <label htmlFor="password">
                        <RiLockPasswordLine className="RegisterIcons"/>PASSWORD
                    </label>
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Create password" 
                        required 
                        className="textInput inputPassword"
                        onChange={handleChange}/>
        
                    <div className="passwordTooltip">
                        <div>
                        <p>Password must atleast contain a</p>
                        <p style={{
                            color: lower? "green" : "red",
                            paddingLeft: "15px"
                        }}>LOWERCASE LETTER</p>

                        <p style={{
                            color: upper? "green" : "red",
                            paddingLeft: "15px"
                        }}>UPPERCASE LETTER</p>

                        <p style={{
                            color: digit? "green" : "red",
                            paddingLeft: "15px"
                        }}>DIGIT</p>

                        <p style={{
                            color: special? "green" : "red",
                            paddingLeft: "15px"
                        }}>SPECIAL CHARACTER</p>

                        <p style={{
                            color: length? "green" : "red",
                            paddingLeft: "15px"
                        }}>SHOULD BE 8 TO 15 DIGITS</p>
                        </div>
                    </div>
                </div>
                <div className="RegisterFieldCheckbox">
                <div className="RegisterFieldCheckboxPart">
                    <label htmlFor="isAdmin">
                        <GrUserAdmin className="RegisterIcons"/>ADMIN
                    </label>
                    <input name="isAdmin" type="checkbox" value="Admin" className="checkboxInput"/>
                </div>
                <div className="RegisterFieldCheckboxPart">
                    <label htmlFor="isClub">
                        <GrGroup className="RegisterIcons"/>CLUB
                    </label>
                    <input name="isClub" type="checkbox" value="Club" className="checkboxInput"/>
                </div>
                </div>
                <div className="errorText">{errorText}</div>
                <div className="addNewButtons">
                    <button className="addUserBtn" type="submit">ADD USER</button>
                    <button className="addUserBtn" onClick={handleBack}>CANCEL</button>
                </div>
            </form>
        </div>
    )
}

export default AdminAddUser;