import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';

const Dialogs = (props) => {
	return(
	
		<div className={s.dialogs}>
			<div className={s.dialogsItem}> 
				<div className={s.dialog}>
					<NavLink to="/dialogs/1">Mariia </NavLink>
				</div>
				<div className={s.dialog}>
					<NavLink to="/dialogs/2">Arek </NavLink>
				</div>
				<div className={s.dialog}>
					<NavLink to="/dialogs/3">Andrey </NavLink>
				</div>
			</div>
		<div className={s.messages}>
          <div className={s.message}> Hi!</div>
          <div className={s.message}> Hello!</div>
          <div className={s.message}> Good day!</div>
		</div>
		</div>

		
		)
}

export default Dialogs;