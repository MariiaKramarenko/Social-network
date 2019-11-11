import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


  let posts =[
  {id:1, message:'Hi! How are you?', likesCount:'0'},
  {id:2, message:'Good day!', likesCount:'10'}
  ]

    let dialogs = [
    {id:1 , name:'Mariia'},
    {id:2 , name:'Vladimir'},
    {id:3 , name:'Piotr'},
    {id:4 , name:'Arek'},
    {id:5 , name:'Ekaterina'}
    ]


    let messages = [
    {id:1, message:'HI!'},
    {id:2, message:'How is your project?'},
    {id:3, message:'Wish you good day!'}
    ]


ReactDOM.render(<App posts={posts} dialogs={dialogs} messages={messages}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
