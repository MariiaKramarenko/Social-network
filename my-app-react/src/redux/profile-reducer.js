import {usersAPI, profileAPI}from '../api/api.js';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';


let initialState = {/*инициализируемый стейт-то есть тот что передается при входе*/
    posts:[
      {id:1, message:'Hi! How are you?', likesCount:'0'},
      {id:2, message:'Good day!', likesCount:'10'}
      ],
    profile: null,
    status: ''
};



const profileReducer = (state = initialState , action) => {
	switch (action.type ){

     case ADD_POST:{

         let newPost = {
          id:5,
          message: action.newPostText,
          likesCount: 0
      };

      return {
        ...state, 
        posts: [...state.posts, newPost]
      };
      }
     case SET_USER_PROFILE: {
          return {...state, profile: action.profile/*меняем значение профайла на то что пришло из экшна*/
          }; 
          }
      case SET_STATUS: {
          return{...state,status:action.status};/*меняем значение статуса на то кот пришло из экшна*/
      }
          
          default:
          return state;
}
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})/*экшнкриейтор кот возвращает тип экшена ADD_POST*/

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const setStatus = (status) => ({type:SET_STATUS, status})/*экшнкриетор для установки статуса*/

export const getUserProfile = (userID) => (dispatch) =>{/*санккриейтор  возвращает санкудля получения профиля юзера*/
           usersAPI.getProfile(userID).then(response => {
           dispatch(setUserProfile(response.data));
    })
}





export const getStatus = (userID) => (dispatch) => {/*санккриетор для получения статуса юзера*/
    profileAPI.getStatus(userID)/*обращаеся к апишке профайла и получаем статус с сервера*/
    .then(response => {
      dispatch(setStatus(response.data));/*сетаем полученный статус*/
    })    
}



export const updateStatus = (status) => (dispatch) => {/*санккриетор для обновления статуса юзера*/
    profileAPI.updateStatus(status)/*обращаеся к апишке профайла*/
    .then(response => {
      if(response.data.resultCode === 0){/*если ответ от сервера без ошибки то делаем диспатч сетстатуса*/
      dispatch(setStatus(status));/*диспатчим сет статус c переданным значением*/
    }})    
}


export const updateNewPostTextActionCreator = (text) =>/*экшнкриейтор принимающий в агрумент текст вводимый пользователм*/
({type: UPDATE_NEW_POST_TEXT, newText:text})/*принимает значение экшн тип UPDATE_NEW_POST_TEXT и записывает текст как новый текст поста*/


export default profileReducer;