import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import {BrowserRouter, Route} from 'react-router-dom';



const App = (props) => {

  return (
    <BrowserRouter>
    <div className="app-wrapper">
      <HeaderContainer />
      <Navbar state={props.state.sideBar} />
      <div className="app-wrapper-content">
        <Route path='/profile/:userID?' render={ () =>  <ProfileContainer />} />

        <Route path='/dialogs' render={ () =>  <DialogsContainer />} />
        
        <Route path='/users' render={ () => <UsersContainer />} />

      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
