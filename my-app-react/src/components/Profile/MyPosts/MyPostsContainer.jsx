import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from './../../../redux/profile-reducer';
/*импортируем экшнкриейторы так как тут мы через них обращаемся к стейту и выполняем действия*/
import MyPosts from './MyPosts';
import Post from './Post/Post';


const MyPostsContainer = (props) => {/*константа майпост принимает в пропсы state*/
 
 let state = props.store.getState();


 let newPostElement = React.createRef();/*реакт,создай ссылку*/

 let addPost = () => {/*функция добавления поста на стену*/
   props.store.dispatch(addPostActionCreator());/*вызываем экшнкриейтер так как в нем лежит условие и доступ к стейту*/
   
 }

 let onPostChange = (text) => {/*удовлетворяем нужну презентационной компненты-выполяем логику колллбеком сздесь,тут каксаемся стора тольков этой компоненте*/
  let action = updateNewPostTextActionCreator(text);
  props.store.dispatch(action);/*знания о сторе мы вынесли в контейнерную компоненту*/
 }



  return(
    <MyPosts 
    updateNewPostText={onPostChange}  
    addPost={addPost} 
    posts={state.profilePage.posts}
    newPostText = {state.profilePage.newPostText }
    />/*передаем коллбеком логику в MyPosts*/    
  	) 

}

export default MyPostsContainer;