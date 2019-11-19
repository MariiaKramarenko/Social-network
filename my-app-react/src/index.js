import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/redux-store';
import './index.css';
import {Provider} from 'react-redux';


let rerenderEntireTree = (state) => {
	ReactDOM.render(
    <Provider store={store}>
	<App state={state} dispatch={store.dispatch.bind(store)} store={store} 
	/>
    </Provider>
	, document.getElementById('root'));
}

rerenderEntireTree(store.getState());/*здесь нам не нужен bind() потомучто мы сразу вызываем от имени store за счет постановки скобок()*/

store.subscribe( () => {/*когда изменится стор он вызовет стреочную функцию и в ней мы вызовем ререндер */
	let state = store.getState();/*берем стейт сами */
	rerenderEntireTree(state);/*и передаем его ререндеру,так работает редакс! он сам не перадет стейт после его изменения!*/

});/*передаем по коллбеку rerenderEntireTree в stete(там мы вызываем subscribe и получаем rerenderEntireTree для выполнения функций ) */

/*так мы избежали циклической зависимости-flux-архитектура*/
serviceWorker.unregister();
