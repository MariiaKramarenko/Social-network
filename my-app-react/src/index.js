import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from './redux/redux-store';//для компоненты Provider
//компонента Provider предоставляет приложению доступ к стору - то есть связывает ее с редаксом

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
