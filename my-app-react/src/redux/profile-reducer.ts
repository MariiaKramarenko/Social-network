import {usersAPI, profileAPI}from '../api/api';
import {stopSubmit} from 'redux-form';
import {PhotosType, PostType, ProfileType} from "../types/types";
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';//делаем action.type для TDD-test
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';//для загрузки фотки юзера

/////TYPES/////////////////////////////////
//other types are imported from types/types.ts
type AddPostActionCreatorActionType={
    type: typeof ADD_POST
    newPostText: string
}
type SetUserProfileActionType={
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type SetStatusActionType={
    type: typeof SET_STATUS
    status: string
}
type DeletePostActionType={
    type: typeof DELETE_POST
    postId: number
}
type SavePhotoSuceessActionType={
    type: typeof SAVE_PHOTO_SUCCESS
    photos:PhotosType
}
/////END OF TYPES/////////////////////////


export type InitialStateType = typeof initialState;//наследуемый тип всего стейта

let initialState = {/*инициализируемый стейт-то есть тот что передается при входе*/
    posts:[
      {id:1, message:'Hi! How are you?', likesCount: 0 },
      {id:2, message:'Good day!', likesCount: 0 }
      ]as Array<PostType>, //воспринимай как массив обьектов типа PostType
    profile: null as ProfileType | null,
    status: " ",
    newPostText: " "
};



const profileReducer = (state = initialState , action:any):InitialStateType => {//возвращается объект типомкоторого является InitialStateType
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
          return {...state, profile:{...state.profile, photos: action.photos} as ProfileType};
      }
          
      default:
          return state;
}
}
/*//////экшн-криеторы///////////*/
export const addPostActionCreator = (newPostText:string):AddPostActionCreatorActionType => ({type: ADD_POST, newPostText})/*экшнкриейтор кот возвращает тип экшена ADD_POST*/
export const setUserProfile = (profile:ProfileType):SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status:string):SetStatusActionType => ({type:SET_STATUS, status})/*экшнкриетор для установки статуса*/
export const deletePost = (postId:number):DeletePostActionType =>({type:DELETE_POST, postId})//делаем actionCreator для TDD-test
export const savePhotoSuceess = (photos:PhotosType):SavePhotoSuceessActionType =>({type:SAVE_PHOTO_SUCCESS, photos})//делаем actionCreator для отпрвки аватра юзера




/*/////санк-криеторы///////////*/
export const getUserProfile = (userID:number) => async (dispatch:any) =>{/*санккриейтор  возвращает санкудля получения профиля юзера*/
          let response = await usersAPI.getProfile(userID);
           dispatch(setUserProfile(response.data));

}
export const getStatus = (userID:number) => async (dispatch:any) => {/*санккриетор для получения статуса юзера*/
    let response = await profileAPI.getStatus(userID);/*обращаеся к апишке профайла и получаем статус с сервера*/
      dispatch(setStatus(response.data));/*сетаем полученный статус*/
  
}
export const updateStatus = (status:string) => async (dispatch:any) => {/*санккриетор для обновления статуса юзера*/
    try {
        let response = await profileAPI.updateStatus(status);/*обращаеся к апишке профайла*/
         if (response.data.resultCode === 0) {//если ответ сервера без ошибки
            dispatch(setStatus(status));//диспатчим статус в стор
        }
    } catch(error) {
        //ловим ошибку от сервера тут должна быть логика
    }
}/*диспатчим сет статус c переданным значением*/
export const savePhoto = (file:any) => async (dispatch:any) => {/*санккриетор для отправки фотто юзера*/
    let response = await profileAPI.savePhoto(file);/*отправляем фото на сервер*/
      if(response.data.resultCode === 0){/*если ответ от сервера без ошибки то делаем диспатч фокти*/
      dispatch(savePhotoSuceess(response.data.data.photos));/*отправляем фотку на сервер */
   
}
}
//санк-криетор для отправки отредактированной информации профиля с помою формы кот их собирает на сервер
export const saveProfile = (profile:ProfileType) => async (dispatch:any, getState:any) =>{
    const userId = getState().auth.userId;//достанем айди пользователя текущего которого данные мы изменили
    const response = await profileAPI.saveProfile(profile);
    //нам не запрещено в рамках одного редьюсера обращаться к другим редьюсерам или стейту глобальному тожн
    if (response.data.resultCode === 0){/*если ответ от сервера без ошибки то делаем диспатч данных */
    dispatch(getUserProfile(userId));//диспатчим получение профиля юзера(так как мы забросили эти данные на сервер то нам прийдет обновленный уже профиль юзера)
} else {
    dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}


export default profileReducer;