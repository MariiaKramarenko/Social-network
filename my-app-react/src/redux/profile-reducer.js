import {usersAPI, profileAPI}from '../api/api.js';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';//делаем action.type для TDD-test
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';//для загрузки фотки юзера


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
      case DELETE_POST: {
          return {...state, posts: state.posts.filter(p => p.id != action.postId)}; 
      }
      case SAVE_PHOTO_SUCCESS: {
          return {...state, profile:{...state.profile, photos: action.photos}}; 
      }
          
      default:
          return state;
}
}
/*//////экшн-криеторы///////////*/
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})/*экшнкриейтор кот возвращает тип экшена ADD_POST*/
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type:SET_STATUS, status})/*экшнкриетор для установки статуса*/
export const deletePost = (postId) =>({type:DELETE_POST, postId})//делаем actionCreator для TDD-test
export const savePhotoSuceess = (photos) =>({type:SAVE_PHOTO_SUCCESS, photos})//делаем actionCreator для отпрвки аватра юзера



/*/////санк-криеторы///////////*/
export const getUserProfile = (userID) => async (dispatch) =>{/*санккриейтор  возвращает санкудля получения профиля юзера*/
          let response = await usersAPI.getProfile(userID);
           dispatch(setUserProfile(response.data));

}

export const getStatus = (userID) => async (dispatch) => {/*санккриетор для получения статуса юзера*/
    let response = await profileAPI.getStatus(userID);/*обращаеся к апишке профайла и получаем статус с сервера*/
      dispatch(setStatus(response.data));/*сетаем полученный статус*/
  
}


export const updateStatus = (status) => async (dispatch) => {/*санккриетор для обновления статуса юзера*/
    let response = await profileAPI.updateStatus(status);/*обращаеся к апишке профайла*/
      if(response.data.resultCode === 0){/*если ответ от сервера без ошибки то делаем диспатч сетстатуса*/
      dispatch(setStatus(status));/*диспатчим сет статус c переданным значением*/
   
}
}

export const savePhoto = (file) => async (dispatch) => {/*санккриетор для отправки фотто юзера*/
    let response = await profileAPI.savePhoto(file);/*отправляем фото на сервер*/
      if(response.data.resultCode === 0){/*если ответ от сервера без ошибки то делаем диспатч фокти*/
      dispatch(savePhotoSuceess(response.data.data.photos));/*отправляем фотку на сервер */
   
}
}
export default profileReducer;