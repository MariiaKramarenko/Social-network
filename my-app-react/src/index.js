import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {rerenderEntireTree} from './render.js';
import state from './redux/state';

rerenderEntireTree(state);


serviceWorker.unregister();
