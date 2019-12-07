import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import Friend from './Friend/Friend';

const Navbar = (props) => {
  
  let listFriends = props.state.avatars.map( f =>
     <Friend name={f.name} src={f.src}/> );
    
  return (
          <nav className={s.nav}>
             <div className={s.item}>
                   <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
             </div>
             <div className={ `${s.item} ${s.active}` }>
                   <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
             </div>
             <div className={s.item}>
                    <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
             </div>
             <div className={s.item}>
                   <a href="#">News</a>
             </div>
             <div className={s.item}>
                   <a href="#">Music</a>
             </div>
             <div className={s.item}>
                   <a href="#">Settings</a>
             </div>
         
              <div >
                <h4 className={s.friends}>My friends:</h4>
                <p> {listFriends} </p>               
              </div>

         </nav>

    )
}

export default Navbar;

