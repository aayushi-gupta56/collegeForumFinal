import React, {useState, useEffect} from 'react'
import './Components.css'
import Post from './posts'
import axios from 'axios'


const Feed = ()=>{

    let [posts, setPosts] = useState([]);

    useEffect(()=>{

      const path = window.location.pathname.split('/');
      const userID = path[path.length-1]

      axios.get(`http://localhost:5000/api/posts/find/${userID}`, {
        headers:{
          "token" : `Bearer ${sessionStorage.getItem("token")}`
        }
      }).then(res=>{
        if(res.status === 200){
            setPosts(res.data)
        }
      }).catch(err=>{
        console.log(err)
      })

    }, []);


    return (
        <div className="feed">
          <div className="feedWrapper">
            {posts.map((p) => (
              <Post key={p.pid} post={p}/>
            ))}
          </div>
        </div>
      );
}

export default Feed;