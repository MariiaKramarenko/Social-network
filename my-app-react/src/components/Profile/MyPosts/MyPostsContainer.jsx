import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from './../../../redux/profile-reducer';
/*импортируем экшнкриейторы так как тут мы через них обращаемся к стейту и выполняем действия*/
import MyPosts from './MyPosts';
import Post from './Post/Post';
import StoreContext from './../../../StoreContext';

const MyPostsContainer = (props) => {/*константа майпост принимает в пропсы state*/
 

  return <StoreContext.Consumer> 
      {(store) => {/* мы передали сюда контекстом стор - то есть вызываем функцию со стором и она вызывает уже jsx*/
/*переносим сюда все функции чтобы они могли достучаться до стора из контекста*/
let state = store.getState();


 let addPost = () => {/*функция добавления поста на стену*/
   store.dispatch(addPostActionCreator());/*вызываем экшнкриейтер так как в нем лежит условие и доступ к стейту*/
   
 }

 let onPostChange = (text) => {/*удовлетворяем нужну презентационной компненты-выполяем логику колллбеком сздесь,тут каксаемся стора тольков этой компоненте*/
  let action = updateNewPostTextActionCreator(text);
  store.dispatch(action);/*знания о сторе мы вынесли в контейнерную компоненту*/
 }

     return <MyPosts 
          updateNewPostText={onPostChange}  
          addPost={addPost} 
          posts={state.profilePage.posts}
          newPostText = {state.profilePage.newPostText } /> 
        } 
      }

    </StoreContext.Consumer>  
  	 

}

export default MyPostsContainer;