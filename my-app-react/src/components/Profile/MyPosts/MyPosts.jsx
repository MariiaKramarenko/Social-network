import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () =>{

  let postData =[
  {id:1, message:'Hi! How are you?', likesCount:'0'},
  {id:2, message:'Good day!', likesCount:'10'}
  ]



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

          <Post message={postData[0].message} likesCount={postData[0].likesCount}/>
          <Post message={postData[1].message} likesCount={postData[1].likesCount}/>

      </div>


  	)

}

export default MyPosts;