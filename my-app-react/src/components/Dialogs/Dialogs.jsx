import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';

const DialogItem = (props) => {

	let path ="/dialogs/" + props.id;

	return(
        <div className={s.dialog + '' + s.active}>
					<NavLink to={path}>{props.name}</NavLink>
				</div>

		)
}

const Message = (props) =>{
    return(
        <div className={s.message}> {props.message}</div>

    	)



}
const Dialogs = (props) => {
	return(
	   
		<div className={s.dialogs}>
			<div className={s.dialogsItems}> 

				<DialogItem name="Mariia" id="1" />
                <DialogItem name="Diana" id="2" />
                <DialogItem name="Vladimir" id="3" />
                <DialogItem name="Piotr" id="4" />
                <DialogItem name="Arek" id="5" />
                <DialogItem name="Ekaterina" id="5" />
			</div>
		<div className={s.messages}>
          <Message message ="HI!" />
          <Message message ="How is your project?"/>
          <Message message ="Wish you good day!" />
		</div>
		</div>

		
		)
}

export default Dialogs;