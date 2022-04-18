import axios from "axios";
import React, { useEffect, useState } from "react";
import {MdPersonRemoveAlt1} from 'react-icons/md'
import {GrUpdate} from 'react-icons/gr'
import useTable from "../hooks/useTable";
import Popup from '../../Components/popup/popup'
import TableFooter from "./TableFooter";
import './adminViewAll.css'



const AdminViewAll = ()=>{
    
    const rowsPerPage = 7;
    const [posts, setPosts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [chance, setChance] = useState([]);
    const [page, setPage] = useState(1);
    const { slice, range } = useTable(posts, page, rowsPerPage);
 
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

     //FUNCTION TO BE EXECUTED WHEN USER CLICKS THE UPDATE BUTTON
     const handleUpdate = (userID)=>{
        window.location=`/admin/find/update/${userID}`;
    }


     //FETCHING DATA FROM API AND UPDATING POSTS ARRAY
    useEffect(()=>{

        axios.get("http://localhost:5000/api/user/find",{
        headers:{
            "token" : `Bearer ${sessionStorage.getItem("token")}`
        }
    })
    .then(res=>{
        setPosts(res.data);
    })
    .catch(err=>{
        console.log(err);
    })

    },[]);


    //FUNCTION TO BE EXECUTED WHEN USER CLICKS THE DELETE BUTTON
    const handleRemove = (userID)=>{
            if(!chance.includes(userID)){
                togglePopup();
                setChance([...chance, userID])
            }
            else{
                axios.delete(`http://localhost:5000/api/user/${userID}`,{
                    headers:{
                        "token" : `Bearer ${sessionStorage.getItem("token")}`
                    }
                })
                .then(res=>{
                    window.location = '/admin/find'
                }).catch(err=>{
                    console.log(err);
                })
            }    
    }

    const handleHome = ()=>{
        window.location = '/'
    }

    const handleProfileVisit = (el)=>{
        if(el.isClub==0)
            window.location = `/stud/profile/${el.userID}`
    }
   
    
      return (
          <div className="table-wrap">
              <button className='home-btn' onClick={handleHome}>HOME</button>
                <div className="adminTableDiv">
                    <table className="adminTable">
                        <thead className="adminTableRowHeader">
                            <tr>
                                <th className="adminTableHeader">USER_ID</th>
                                <th className="adminTableHeader">EMAIL</th>
                                <th className="adminTableHeader">CLUB</th>
                                <th className="adminTableHeader">ADMIN</th>
                                <th className="adminTableHeader">ACTIONS</th>
                                <th className="adminTableHeader">PROFILE</th>
                                <th className="adminTableHeader">TIMELINE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slice.map((el) => (
                                <tr className="adminTableRowItems" key={el.userID}>
                                    <td className="adminTableCell">{el.userID}</td>
                                    <td className="adminTableCell">{el.email}</td>
                                    <td className="adminTableCell">{el.isClub}</td>
                                    <td className="adminTableCell">{el.isAdmin}</td>
                                    <td><MdPersonRemoveAlt1 className="admin-remove-icon" onClick={()=>{handleRemove(el.userID)}}/>
                                        <GrUpdate className="admin-update-icon" onClick={()=>handleUpdate(el.userID)}/></td>
                                    <td className="adminTableCell">{el.isAdmin? "N/A :(" :<button className="visitButton" onClick={()=>{handleProfileVisit(el)}}>VISIT</button>}</td>
                                    <td className="adminTableCell">{el.isAdmin? "N/A :(" :<button className="visitButton">VISIT</button>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
                </div>
                {isOpen && <Popup
                    content={<>
                        <b>ALERT</b>
                        <p>This action can't be undone. If you are sure you want to delete current student data please click on the delete icon again.</p>
                    </>}
                    handleClose={togglePopup}
                />}
        </div>
    );

}

export default AdminViewAll;