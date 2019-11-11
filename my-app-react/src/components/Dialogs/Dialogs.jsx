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
    
    let dialogs = [
    {id:1 , name:'Mariia'},
    {id:2 , name:'Vladimir'},
    {id:3 , name:'Piotr'},
    {id:4 , name:'Arek'},
    {id:5 , name:'Ekaterina'}
    ]
    
    let dialogsElements = dialogs.map( d => 
    	<DialogItem name={d.name} id={d.id} /> );

    let messages = [
    {id:1, message:'HI!'},
    {id:2, message:'How is your project?'},
    {id:3, message:'Wish you good day!'}
    ]

    let massagesElements = messages.map( m =>
    	<Message message ={m.message} />
    	);

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