import profileReducer from "./profile-reducer.js";
import dialogsReducer from "./dialogs-reducer.js";
import sidebarReducer from "./sidebar-reducer.js";


let store = {

_state: {
  profilePage: {
    posts:[
      {id:1, message:'Hi! How are you?', likesCount:'0'},
      {id:2, message:'Good day!', likesCount:'10'}
      ],
    newPostText:'mariia kramarenko'} ,

  dialogsPage:{
    messages: [
      { id: 1, message: 'hi' },
      { id: 2, message: 'How is you project?' },
      { id: 3, message: 'Yep' }
    ],
    dialogs: [
      { id: 1, name: 'Mariya' },
      { id: 2, name: 'Arek' },
      { id: 3, name: 'Valeriy' },
      { id: 4, name: 'Kostiantym' },
      { id: 5, name: 'Anna' },
      { id: 6, name: 'Ekaterina' }
    ],

    newMessageBody:" "
     },

  sideBar:{
    avatars: [
     {id: 1, src: 'https://image.flaticon.com/icons/svg/145/145843.svg',  name: 'Vasyl' },
     {id: 2, src: 'https://image.flaticon.com/icons/svg/145/145847.svg',  name: 'Mariia' },
     {id: 3, src: 'https://image.flaticon.com/icons/svg/145/145846.svg',  name: 'Arek' },
     {id: 4, src: 'https://image.flaticon.com/icons/svg/145/145844.svg',  name: 'Ekaterina' }]
  }
},

getState(){
 return this._state;
},


_callSubscriber(){
  console.log('hello');
},


subscribe (observer) {/*коллбеком передадим сюда нужную нам rerenderEntireTree*/
  this._callSubscriber = observer;/*и передаем нашему обсерверу наш нужный здесь rerenderEntireTree*/
},


dispatch (action) {

  this._state.profilePage = profileReducer(this._state.profilePage, action);/*отдаем этому редьюсеру конкретно то что ему нужно и перезаписыааем текущее значение state через возвращаемое значение*/
  this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
  this._state.sideBar = sidebarReducer(this._state.sideBar, action);

  this._callSubscriber(this._state);
  }

}




export default store;

