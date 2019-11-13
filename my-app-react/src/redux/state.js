let rerenderEntireTree = () =>{
  console.log('hello');
}

let state = {

profilePage:{
    posts:[
      {id:1, message:'Hi! How are you?', likesCount:'0'},
      {id:2, message:'Good day!', likesCount:'10'}
      ],
    newPostText:'mariia kramarenko'
} ,

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
    ] 
},

sideBar:{
    avatars: 
    [{id: 1, src: 'https://image.flaticon.com/icons/svg/145/145843.svg',  name: 'Vasyl' },
     {id: 2, src: 'https://image.flaticon.com/icons/svg/145/145847.svg',  name: 'Mariia' },
     {id: 3, src: 'https://image.flaticon.com/icons/svg/145/145846.svg',  name: 'Arek' },
     {id: 4, src: 'https://image.flaticon.com/icons/svg/145/145844.svg',  name: 'Ekaterina' }]}
 
}

export const addPost = () => {
    let newPost = {
      id:5,
      message: state.profilePage.newPostText,/*спрашиваем у стейта значение введенное нами*/
      likesCount: 0
    };/*сюда это запихивается как соообщение для newPost */

   state.profilePage.posts.push(newPost);/* затем, полученный нами newPost  мы пушим в конец массива с постами*/
   state.profilePage.newPostText = ' ';/*занулим строку*/
   rerenderEntireTree(state);/*и обновляем наш state чтобы отрисовать все после изменения*/
}


export const updateNewPostText = (newText) => {/*сюда приходит значение text из textarea которое мы передали в функцию onChange*/
   state.profilePage.newPostText = newText;/*ут text становится newText и записывается в state*/
   rerenderEntireTree(state);/*дерево перерисовывется с новым уже значением и мы видим его при вводе*/

 }

export const subscribe = (observer) => {/*коллбеком передадим сюда нужную нам rerenderEntireTree*/
  rerenderEntireTree = observer;/*и передаем нашему обсерверу наш нужный здесь rerenderEntireTree*/
}

export default state;