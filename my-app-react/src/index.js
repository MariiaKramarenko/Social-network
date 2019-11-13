import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import state , {subscribe} from './redux/state';
import './index.css';
import {addPost, updateNewPostText} from './redux/state';


let rerenderEntireTree = (state) => {
	ReactDOM.render(<App state={state} 
	addPost={addPost} 
	updateNewPostText={updateNewPostText}/>, document.getElementById('root'));
}

rerenderEntireTree(state);

subscribe(rerenderEntireTree);/*передаем по коллбеку rerenderEntireTree в stete(там мы вызываем subscribe и получаем rerenderEntireTree для выполнения функций ) */
/*так мы избежали циклической зависимости-flux-архитектура*/
serviceWorker.unregister();
