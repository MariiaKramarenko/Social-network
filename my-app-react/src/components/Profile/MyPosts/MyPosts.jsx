import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';




const MyPosts = (props) => {/*константа майпост принимает в пропсы state*/

 let postsElements = /*орисовываем (мапим) посты путем преобразования массива posts в jsx элемент*/
    props.posts.map( p =>
      <Post message={p.message} likesCount={p.likesCount}/>
      );

 let newPostElement = React.createRef();/*реакт,создай ссылку*/

 let onAddPost = () => {/*функция добавления поста на стену*/
   props.addPost();
   
 }

 let onPostChange = () => {/*устанавливаем обработчик изменения на teaxtarea*/
  let text = newPostElement.current.value;/*получаем значение teaxtareaи записываем*/
  props.updateNewPostText(text);
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
              <button onClick ={ onAddPost } className={s.addpost}>Add post</button>
          </div>
          {postsElements}
      </div>
  	)

}

export default MyPosts;