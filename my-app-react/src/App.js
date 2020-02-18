import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {getAuthUserData} from './redux/auth-reducer';
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from './redux/redux-store';//для компоненты Provider

class App extends React.Component {

componentDidMount() {//проверяем инициализацию всего приложения через initializeApp кот находится в app-reducer
        this.props.initializeApp();
}

 render() {//составим условие для инициализации приложения
          if (!this.props.initialized) {//если инициализация вернула false тогда высвечиваем прокрутку(прелоадер компонента)
            return <Preloader/>
        }

  return (
    <BrowserRouter>
    <Provider store={store}>
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content">
        <Route path='/profile/:userID?' render={ () =>  <ProfileContainer />} />

        <Route path='/dialogs' render={ () =>  <DialogsContainer />} />
        
        <Route path='/users' render={ () => <UsersContainer />} />
        
        <Route path='/login' render={ () => <Login />} />
      </div>
    </div>
     </Provider>
    </BrowserRouter>
  );
}
}
const mapStateToProps = (state) => ({//прокидываем пропсами значение initialized для того чтобы сделать инициализацию
    initialized: state.app.initialized
})
export default compose(connect(mapStateToProps, {initializeApp}))(App);//композим результат
