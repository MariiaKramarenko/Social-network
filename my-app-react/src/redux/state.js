const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';


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


subscribe(observer){/*коллбеком передадим сюда нужную нам rerenderEntireTree*/
  this._callSubscriber = observer;/*и передаем нашему обсерверу наш нужный здесь rerenderEntireTree*/
},


dispatch(action){
  if 
    (action.type === ADD_POST){
      let newPost = {/*обычная переменная внутри метода */
      id:5,
      message: this._state.profilePage.newPostText,/*спрашиваем у стейта значение введенное нами*/
      likesCount: 0
    };/*сюда это запихивается как соообщение для newPost */

   this._state.profilePage.posts.push(newPost);/* затем, полученный нами newPost  мы пушим в конец массива с постами*/
   this._state.profilePage.newPostText = ' ';/*занулим строку*/
   this._callSubscriber(this._state);/*и обновляем наш state чтобы отрисовать все после изменения*/
  }
   else if
       (action.type === UPDATE_NEW_POST_TEXT){
          this._state.profilePage.newPostText = action.newText;/*ут text становится newText и записывается в state*/
          this._callSubscriber(this._state);/*дерево перерисовывется с новым уже значением и мы видим его при вводе*/
  } else if 
       (action.type === UPDATE_NEW_MESSAGE_BODY){
          this._state.dialogsPage.newMessageBody = action.body;
          this._callSubscriber(this._state);
  } else if 
       (action.type === SEND_MESSAGE) {
          let body = this._state.dialogsPage.newMessageBody;
          this._state.dialogsPage.newMessageBody='';
          this._state.dialogsPage.messages.push({id:4, message: body});
          this._callSubscriber(this._state);


  }
}
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = (text) =>
({type: UPDATE_NEW_POST_TEXT, newText:text})


export const sendMessageCreator = () =>({type:SEND_MESSAGE})

export const updateNewMessageBodyCreator = (body) =>({type:UPDATE_NEW_MESSAGE_BODY, body:body })

export default store;

