import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//тест работы всего приложения
it('renders without crashing', () => {//приложение не падает
  const div = document.createElement('div');//достаем нудный айди

  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
