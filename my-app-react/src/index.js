import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
<MainApp/>
, document.getElementById('root'));

serviceWorker.unregister();
