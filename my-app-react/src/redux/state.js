import {rerenderEntireTree} from './../render.js';

let state = {

profilePage:{
    posts:[
      {id:1, message:'Hi! How are you?', likesCount:'0'},
      {id:2, message:'Good day!', likesCount:'10'}
      ]

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
    avatars: [
     {id: 1, src: 'https://image.flaticon.com/icons/svg/145/145843.svg',  name: 'Vasyl' },
     {id: 2, src: 'https://image.flaticon.com/icons/svg/145/145847.svg',  name: 'Mariia' },
     {id: 3, src: 'https://image.flaticon.com/icons/svg/145/145846.svg',  name: 'Arek' },
     {id: 4, src: 'https://image.flaticon.com/icons/svg/145/145844.svg',  name: 'Ekaterina' }
  ]
  }
 
}

export let addPost = (postMessage) => {

    let newPost = {
      id:5,
      message: postMessage,
      likesCount: 0
    };

   state.profilePage.posts.push(newPost);
   rerenderEntireTree(state);
}


export default state;