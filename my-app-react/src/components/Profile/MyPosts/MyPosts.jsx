import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {addPostActionCreator, updateNewPostTextActionCreator} from './../../../redux/profile-reducer';
/*импортируем экшнкриейторы так как тут мы через них обращаемся к стейту и выполняем действия*/




const MyPosts = (props) => {/*константа майпост принимает в пропсы state*/

 let postsElements = /*орисовываем (мапим) посты путем преобразования массива posts в jsx элемент*/
    props.posts.map( p =>
      <Post message={p.message} likesCount={p.likesCount}/>
      );

 let newPostElement = React.createRef();/*реакт,создай ссылку*/

 let addPost = () => {/*функция добавления поста на стену*/
   props.dispatch(addPostActionCreator());/*вызываем экшнкриейтер так как в нем лежит условие и доступ к стейту*/
   
 }

 let onPostChange = () => {/*устанавливаем обработчик изменения на teaxtarea*/
  let text = newPostElement.current.value;/*получаем значение teaxtareaи записываем*/
  props.dispatch(updateNewPostTextActionCreator(text));/*отправляем  в state значение которое мы взяли как value из textarea
   с помощью экшнкриейтера так как в нем лежит и условие для выполнения 
   и сам доступ к стейту и сами действия для добавления поста*/
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