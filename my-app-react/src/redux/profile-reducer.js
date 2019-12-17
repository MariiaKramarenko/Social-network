const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {/*инициализируемый стейт-то есть тот что передается при входе*/
    posts:[
      {id:1, message:'Hi! How are you?', likesCount:'0'},
      {id:2, message:'Good day!', likesCount:'10'}
      ],
    newPostText:'mariia kramarenko',
    profile: null
};



const profileReducer = (state = initialState , action) => {
	switch (action.type ){

     case ADD_POST:{

         let newPost = {
          id:5,
          message: state.newPostText,
          likesCount: 0
      };

      return {
        ...state, 
        newPostText: ' ',
        posts: [...state.posts, newPost]
      };
      }
       
     case UPDATE_NEW_POST_TEXT: {
          return {...state, 
            newPostText: action.newText
          };
      }

     case SET_USER_PROFILE: {
          return {...state, profile: action.profile
          }; 
          }
          
          default:
          return state;
}
}

export const addPostActionCreator = () => ({type: ADD_POST})/*экшнкриейтор кот возвращает тип экшена ADD_POST*/

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const updateNewPostTextActionCreator = (text) =>/*экшнкриейтор принимающий в агрумент текст вводимый пользователм*/
({type: UPDATE_NEW_POST_TEXT, newText:text})/*принимает значение экшн тип UPDATE_NEW_POST_TEXT и записывает текст как новый текст поста*/


export default profileReducer;