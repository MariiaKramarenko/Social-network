import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import {getAuthUserData} from './redux/auth-reducer';
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

 render() {
          if (!this.props.initialized) {
            return <Preloader/>
        }

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
}
const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
export default compose(connect(mapStateToProps, {initializeApp}))(App);
