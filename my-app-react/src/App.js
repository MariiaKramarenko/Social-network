import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from './components/Users/UsersContainer';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import {Route, withRouter, Redirect, Switch, BrowserRouter} from 'react-router-dom';
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {getAuthUserData} from './redux/auth-reducer';
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";
import 'bootstrap/dist/css/bootstrap.min.css';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component {

catchAllUnhandledErrors = (reason, promise) => {//метод,отлавливающий ошибки от сервера (причина и ответ)
        alert("Some error occured");//вывод сообщения об ошибке
        //console.error(promiseRejectionEvent);
    }
    componentDidMount() {//метод жз
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);//добавляем отлов ошибки
    }//добавили слушателя (listener) на глобальный объект window , когда произойдет событие "unhandledrejection" тогда вызывается метод
//помним что если используем  addEventListener то всегда нужно делать и  removeEventListener  
    componentWillUnmount() {//метод жз
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);//удаляем отлов ошибки
    }
 render() {//составим условие для инициализации приложения
          if (!this.props.initialized) {//если инициализация вернула false тогда высвечиваем прокрутку(прелоадер компонента)
            return <Preloader/>
        }

  return (

    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar />
      <div className="app-wrapper-content">
      <Switch>
      <Route exact path='/' render={() => <Redirect to={"/profile"}/>}/>
        <Route path='/profile/:userID?'  render={withSuspense(ProfileContainer)}  />

        <Route path='/dialogs'  render={withSuspense(DialogsContainer)} />
        
        <Route path='/users' render={ () => <UsersContainer pageTitle={"React and Redux"}/>} />
        
        <Route path='/login' render={ () => <Login />} />

        <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
        </Switch>
      </div>
    </div>

  );
}
}
const mapStateToProps = (state) => ({//прокидываем пропсами значение initialized для того чтобы сделать инициализацию
    initialized: state.app.initialized
})
let AppContainer = compose(connect(mapStateToProps, {initializeApp}))(App);//композим результат и записываем в переменную

const MainApp = (props) => {
   return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default MainApp;