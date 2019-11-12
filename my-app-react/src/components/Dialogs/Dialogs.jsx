import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import Message from './Message/Message';
import DialogItem from './DialogItem/DiialogItem';

const Dialogs = (props) => {
 
    let dialogsElements = props.state.dialogs.map( d => 
    	<DialogItem name={d.name} id={d.id} /> );

    let massagesElements = props.state.messages.map( m =>
    	<Message message ={m.message} />);

	return(	   
		<div className={s.dialogs}>
			<div className={s.dialogsItems}> 				
                {dialogsElements}              
			</div>
		<div className={s.messages}>         
          {massagesElements}
		</div>
		</div>		
		)
}

export default Dialogs;