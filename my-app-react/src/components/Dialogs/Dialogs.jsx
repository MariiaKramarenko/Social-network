import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import Message from './Message/Message';
import DialogItem from './DialogItem/DiialogItem';
import {sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer';

const Dialogs = (props) => {
     

    let state = props.store.getState().dialogsPage;
    let dialogsElements = state.dialogs.map( d => <DialogItem  name={d.name} id={d.id} /> );
    let massagesElements = state.messages.map( m => <Message message ={m.message} />);
    let newMessageBody = state.newMessageBody;



    let newMessageElement = React.createRef();
   
    let onSendMessageClick =() =>{
    let text = newMessageElement.current.value;
     props.store.dispatch(sendMessageCreator());
    }

    let onNewMessageChange =(e)=>{
     let body = e.target.value;
     props.store.dispatch(updateNewMessageBodyCreator(body));
    }
	return(	   
		<div className={s.dialogs}>

			<div className={s.dialogsItems}> 				
                {dialogsElements}              
			</div>

		    <div className={s.messages}>         
                {massagesElements}
                <textarea value={newMessageBody}  onChange={onNewMessageChange} ref={newMessageElement}></textarea>
                 <button onClick={onSendMessageClick}>Send message</button>
		    </div>

		</div>		
		)
}

export default Dialogs;