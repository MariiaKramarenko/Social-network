import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import Friend from './Friend/Friend';

const Navbar = (props) => {

  return (
          <nav className={s.nav}>
             <div className={s.item}>
                   <NavLink to="/profile" 
                   activeClassName={s.activeLink} 
                   className={s.item}>Profile</NavLink>
             </div>
             <div className={ `${s.item} ${s.active}` }>
                   <NavLink to="/dialogs" 
                   activeClassName={s.activeLink}
                   className={s.item}>Messages</NavLink>
             </div>
             <div className={s.item}>
                    <NavLink to="/users" 
                    activeClassName={s.activeLink}
                    className={s.item}>Users</NavLink>
             </div>
             <div className={s.item}>
                   <a href="#" className={s.item}>News</a>
             </div>
             <div className={s.item}>
                   <a href="#" className={s.item}>Music</a>
             </div>
             <div className={s.item}>
                   <a href="#" className={s.item}>Settings</a>
             </div>
         </nav>

    )
}

export default Navbar;

