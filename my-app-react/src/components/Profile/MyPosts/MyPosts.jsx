import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

 let postsElements = 
    props.posts.map( p =>
      <Post message={p.message} likesCount={p.likesCount}/>
      );

 let newPostElement = React.createRef();/*реакт,создай ссылку*/

 let addPost = () => {
   let text = newPostElement.current.value;
   props.addPost(text);
   newPostElement.current.value = '';
 }

 let onPostChange = () =>{


 }



  return(
    <div className={s.postsBlock}>

         <div  className={s.myposts}>
              My posts
         </div>

          <div>
              <textarea  onChange={onPostChange} ref={newPostElement} value={props.newPostText} />
          </div>

          <div>
              <button onClick ={ addPost } className={s.addpost}>Add post</button>
          </div>
          {postsElements}
      </div>
  	)

}

export default MyPosts;