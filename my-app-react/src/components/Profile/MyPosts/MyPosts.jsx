import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from 'redux-form';



const MyPosts = (props) => {/*константа майпост принимает в пропсы state*/

 let postsElements = /*орисовываем (мапим) посты путем преобразования массива posts в jsx элемент*/
    props.posts.map( p =>
      <Post message={p.message} likesCount={p.likesCount}/>
      );


 let onAddPost = (values) => {/*функция добавления поста на стену*/
   props.addPost(values.newPostText);/*вызываем коллбек который задиспатчит значение нового поста пришедшее из onSubmit*/
   
 }

  return(
    <div className={s.postsBlock}>

         <div  className={s.myposts}>
              My posts
         </div>
        <AddNewPostFormRedux onSubmit={onAddPost}/>          
          {postsElements}
      </div>
  	)

}

const AddNewPostForm = (props) =>{/*выносим форму в отдельную компоненту*/
 return (
         <form onSubmit={props.handleSubmit}>
            <div>
              <Field placeholder={"Send your post"} name={"newPostText"} component={"textarea"}/>
            </div>
            <div>
              <button className={s.addpost}>Add post</button>
            </div>
          </form>
          )
}

const AddNewPostFormRedux = reduxForm({form:"ProfileAddNewPostForm"}) (AddNewPostForm);/*оборачиваем форму в хок редакс формы*/

export default MyPosts;