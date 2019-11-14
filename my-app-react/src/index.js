import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/state';
import './index.css';



let rerenderEntireTree = (state) => {
	ReactDOM.render(<App 
	state={state} 
	dispatch={store.dispatch.bind(store)} 
	store={store} />, document.getElementById('root'));
}

rerenderEntireTree(store.getState());/*здесь нам не нужен bind() потомучто мы сразу вызываем от имени store за счет постановки скобок()*/

store.subscribe(rerenderEntireTree);/*передаем по коллбеку rerenderEntireTree в stete(там мы вызываем subscribe и получаем rerenderEntireTree для выполнения функций ) */
/*так мы избежали циклической зависимости-flux-архитектура*/
serviceWorker.unregister();
