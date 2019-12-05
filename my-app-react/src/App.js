import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import UsersContainer from './components/Users/UsersContainer';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import {BrowserRouter, Route} from 'react-router-dom';



const App = (props) => {

  return (
    <BrowserRouter>
    <div className="app-wrapper">
      <Header />
      <Navbar state={props.state.sideBar} />
      <div className="app-wrapper-content">
        <Route path='/profile' render={ () =>  <Profile />} />

        <Route path='/dialogs' render={ () =>  <DialogsContainer />} />
        
        <Route path='/users' render={ () => <UsersContainer />} />

      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
