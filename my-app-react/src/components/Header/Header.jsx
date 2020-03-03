import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import logo from "../../assets/images/logo_react.png";
const Header = (props) =>{
	return(
       <header className={s.header}>
       <img src={logo} />
        <div className={s.loginBlock}>
        {props.isAuth 
        	? <div> {props.login}  - <button className="btn btn-primary" onClick={props.logout}>Log out</button></div>
        	: <NavLink className ="btn btn-primary" to={'login/'}> Login </NavLink> }

        </div>
      </header>  
		)
}

export default Header;