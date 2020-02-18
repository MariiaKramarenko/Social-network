import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';


//компонента Provider предоставляет приложению доступ к стору - то есть связывает ее с редаксом

	ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.unregister();
