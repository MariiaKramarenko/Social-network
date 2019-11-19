import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from './../../../redux/profile-reducer';
/*импортируем экшнкриейторы так как тут мы через них обращаемся к стейту и выполняем действия*/
import MyPosts from './MyPosts';
import Post from './Post/Post';
import {connect} from 'react-redux';


let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
    }
}

let mapDispatchToProps = (dispatch) => {
  return {

    updateNewPostText:(text) => {
      let action = updateNewPostTextActionCreator(text);
      dispatch(action);/*знания о сторе мы вынесли в контейнерную компоненту*/
    },

    addPost: () => {
      dispatch(addPostActionCreator());
    }
    
    }
}


const MyPostsContainer = connect (mapStateToProps, mapDispatchToProps) (MyPosts);




export default MyPostsContainer;