import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () =>{
  return(
    <div className={s.postsBlock}>

         <div  className={s.myposts}>
              My posts
         </div>

          <div>
              <textarea></textarea>
          </div>

          <div>
              <button className={s.addpost}>Add post</button>
          </div>

          <Post />


      </div>


  	)

}

export default MyPosts;