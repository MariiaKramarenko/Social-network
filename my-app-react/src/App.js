import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from './components/Users/UsersContainer';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import {Route, withRouter, HashRouter} from 'react-router-dom';
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {getAuthUserData} from './redux/auth-reducer';
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component {

componentDidMount() {//проверяем инициализацию всего приложения через initializeApp кот находится в app-reducer
        this.props.initializeApp();
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
        <Route path='/profile/:userID?'  render={withSuspense(ProfileContainer)}  />

        <Route path='/dialogs'  render={withSuspense(DialogsContainer)} />
        
        <Route path='/users' render={ () => <UsersContainer />} />
        
        <Route path='/login' render={ () => <Login />} />
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
   return <HashRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </HashRouter>
}

export default MainApp;