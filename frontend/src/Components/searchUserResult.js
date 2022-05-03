import React, {useState, useEffect} from 'react'
import './Components.css'
import axios from 'axios'
import User from './users'

const SearchUserResults = ({term})=>{
    let [users, setUsers] = useState([]);

    useEffect(()=>{

        axios.get('http://localhost:5000/api/user/search', {
          headers:{
            "token" : `Bearer ${sessionStorage.getItem("token")}`
          },
          params:{
              "term" : term
          }
        }).then(res=>{
          if(res.status === 200){
              setUsers(res.data)
          }
        }).catch(err=>{
          console.log(err)
        })
  
      }, [term]);

      return (
        <div className="searchUsersResults">
          {term==='' ? <div className='NoPostsDiv'><p>DON'T YOU WANT TO LOOK FOR SOMEONE? &nbsp;&gt;_&lt;</p></div> :  
            users.length===0? <div className='NoPostsDiv'><p>SORRY NO SUCH USER EXISTS :(</p></div>:
                <div className='searchUsersWrapper'>
                    {users.map((u) => (
                        <User key={u.userID} user={u}/>
                    ))}
                </div>
            }
        </div>
      );
}

export default SearchUserResults;