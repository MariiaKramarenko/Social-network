import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/redux-store';
import './index.css';
import {Provider} from 'react-redux';

//компонента Provider предоставляет приложению доступ к стору - то есть связывает ее с редаксом

	ReactDOM.render(
    <Provider store={store}>
	<App/>
    </Provider>
	, document.getElementById('root'));

serviceWorker.unregister();
