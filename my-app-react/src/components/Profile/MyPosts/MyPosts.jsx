import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {addPostActionCreator, updateNewPostTextActionCreator} from './../../../redux/state';




const MyPosts = (props) => {

 let postsElements = 
    props.posts.map( p =>
      <Post message={p.message} likesCount={p.likesCount}/>
      );

 let newPostElement = React.createRef();/*реакт,создай ссылку*/

 let addPost = () => {/*функция добавления поста на стену*/
   props.dispatch(addPostActionCreator());
   
 }

 let onPostChange = () => {/*устанавливаем обработчик изменения на teaxtarea*/
  let text = newPostElement.current.value;/*получаем значение teaxtareaи записываем*/
  props.dispatch(updateNewPostTextActionCreator(text));/*отправляем в bll в state значение которое мы взяли как value из textarea*/
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