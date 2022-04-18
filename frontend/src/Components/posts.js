import React, {useState} from 'react'
import "./Components.css"
import { BsThreeDotsVertical } from 'react-icons/bs'
import {PF} from '../Pages/publicFolder'


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
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
}

const Post = ({ post })=>{
    return (
        <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImg"
                src={post.profile?post.profile : `${PF}unknown.png`}
                alt=""
              />
              <div className="postTopLeftText">
              <span className="postUsername">
                {post.name}
              </span>
              <span className='postDate'>{post.createdAt}</span>
              </div>
              
            </div>
            <div className="postTopRight">
              <BsThreeDotsVertical />
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