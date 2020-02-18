import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
//тест работы всего приложения
it('renders without crashing', () => {//приложение не падает
  const div = document.createElement('div');//достаем нудный айди
//рендерим все приложение
  ReactDOM.render(<BrowserRouter><Provider><App /></Provider></BrowserRouter>,div);

  ReactDOM.unmountComponentAtNode(div);
});
