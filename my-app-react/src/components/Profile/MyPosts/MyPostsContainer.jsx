import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from './../../../redux/profile-reducer';
/*импортируем экшнкриейторы так как тут мы через них обращаемся к стейту и выполняем действия*/
import MyPosts from './MyPosts';
import Post from './Post/Post';
import {connect} from 'react-redux';


let mapStateToProps = (state) => {/*прокидываем пропсы в эту компоненту из стейта*/
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {/*вызываем действия с помощью прокинутых коллбеков*/
  return {
    addPost: (newPostText) => {/*добавляем пост на стену-вызываем редьюсер*/
      dispatch(addPostActionCreator(newPostText));
    }
    
    }
}


const MyPostsContainer = connect (mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;