import React, {useState, useEffect} from 'react'
import './Components.css'
import Post from './posts'
import axios from 'axios'


const SearchPostResults = ({tags})=>{

    let [posts, setPosts] = useState([]);

    useEffect(()=>{

      axios.get('http://localhost:5000/api/posts/find', {
        headers:{
          "token" : `Bearer ${sessionStorage.getItem("token")}`
        },
        params:{
            "tag" : tags
        }
      }).then(res=>{
        if(res.status === 200){
            setPosts(res.data)
        }
      }).catch(err=>{
        console.log(err)
      })

    }, [tags]);


    return (
        <div className="feed">
          {posts.length===0 ? <div className='NoPostsDiv'><p>SORRY NO POSTS FOUND</p></div> :  
                <div className='feedWrapper'>
                    {posts.map((p) => (
                        <Post key={p.pid} post={p}/>
                    ))}
                </div>
            }
        </div>
      );
}

export default SearchPostResults;