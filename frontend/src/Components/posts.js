import React, {useState} from 'react'
import "./Components.css"
import axios from 'axios'
import { AiOutlineDelete } from 'react-icons/ai'
import {PF, BF} from '../Pages/publicFolder'
import {format} from 'timeago.js'


const ReadMore = ({children})=>{
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 250) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {text.length>250 && (isReadMore ? "...read more" : " show less")}
      </span>
    </p>
  );
}

const Post = ({ post, current, search })=>{

    const [name, setName] = useState('');
    const [profile, setProfile] = useState('');

    if(search===true){

      axios.get(`http://localhost:5000/api/user/find/${post.uid}`, {
        headers: {
          'token' : `Bearer ${sessionStorage.getItem('token')}`
        }
      }).then(res=>{

        if(res.data.isClub===1){

          axios.get(`http://localhost:5000/api/clubs/profile/${post.uid}`, {
            headers:{
              'token'  :`Bearer ${sessionStorage.getItem('token')}`
            }
          }).then(result=>{
              setName(result.data.name)
              setProfile(result.data.profile)
          }).catch(err=>{
            console.log(err);
          })

        }else if(res.data.isAdmin===0){

          axios.get(`http://localhost:5000/api/stud/profile/${post.uid}`, {
            headers:{
              'token'  :`Bearer ${sessionStorage.getItem('token')}`
            }
          }).then(result=>{
              setName(result.data.name)
              setProfile(result.data.profile)
          }).catch(err=>{
            console.log(err);
          })

        }

      }).catch(err=>{
        console.log(err)
      })
    }

    return (
        <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImg"
                src={search===true ? `${BF}${profile}` : post.profile? `${BF}${post.profile}` : `${PF}unknown.png`}
                alt=""
              />
              <div className="postTopLeftText">
              <span className="postUsername">
                {search===true ? name : post.name}
              </span>
              <span className='postDate'>{format(post.createdAt)}</span>
              </div>
              
            </div>
            <div className="postTopRight">
              {(current.userID===post.uid || current.isAdmin===1) && <AiOutlineDelete className='post-deleteBtn'/>}
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">
              <ReadMore>
                {post?.caption}
              </ReadMore>
            </span>
            <img className="postImg" src={post?.photo} alt="" />
          </div>
        </div>
      </div>
      );
}

export default Post;