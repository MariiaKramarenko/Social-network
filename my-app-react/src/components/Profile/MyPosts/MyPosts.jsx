import React from 'react';
import s from './MyPosts.module.css';

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

          <div className={s.item}>
            bla bla bla    
          </div>

      </div>


  	)

}

export default MyPosts;