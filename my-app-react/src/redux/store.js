import profileReducer from "./profile-reducer.js";/*импортируем редьюсеры*/
import dialogsReducer from "./dialogs-reducer.js";
import sidebarReducer from "./sidebar-reducer.js";


let store = {/*стор-наш собственно созданный стор,еще не редакс*/

_state: {/*приватное свойство так как _ и мы не можем обратиться к нему снаружи*/
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

    newMessageBody:" "/*место,куда мы записываем новое значение вводимое нами в текстареа как сообщение*/
     },

  sideBar:{/*вывод статичных друзей в сайдбаре*/
    avatars: [
     {id: 1, src: 'https://image.flaticon.com/icons/svg/145/145843.svg',  name: 'Vasyl' },
     {id: 2, src: 'https://image.flaticon.com/icons/svg/145/145847.svg',  name: 'Mariia' },
     {id: 3, src: 'https://image.flaticon.com/icons/svg/145/145846.svg',  name: 'Arek' },
     {id: 4, src: 'https://image.flaticon.com/icons/svg/145/145844.svg',  name: 'Ekaterina' }]
  }
},

getState(){/*метод гетстейт получающий стейт и возвращающий его путем обращения к приватному стейту*/
 return this._state;
},


_callSubscriber(){/*приватный метод, которому мы передали rerender нашего приложения из метода ниже*/
  console.log('hello');
},


subscribe (observer) {/*метод, коллбеком передадим сюда нужную нам rerenderEntireTree из index.js и назовем ее observer здесь(название здесь не имеет для нас значения)*/
  this._callSubscriber = observer;/*и передаем нашему обсерверу наш нужный здесь rerenderEntireTree*/
},


dispatch (action) {/*метод диспач-метод с пом которго мы обращаемся к state и производим манипуляции с ним*/

  this._state.profilePage = profileReducer(this._state.profilePage, action);/*отдаем редьюсеру для профайла  конкретно то что ему нужно и перезаписыааем текущее значение state через возвращаемое значение*/
  this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);/*редьюсер для лдиалогов*/
  this._state.sideBar = sidebarReducer(this._state.sideBar, action);/*редьюсер для сайдбара*/

  this._callSubscriber(this._state);/*вызываем субскрайбер метод(в нем ререндер) берем его устейта так как он приватный*/
  }

}




export default store;/*экспорт по умолчанию*/

