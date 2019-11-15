import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import Message from './Message/Message';
import DialogItem from './DialogItem/DiialogItem';
import {sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer';

const Dialogs = (props) => {/*константа отвечающая за отлисовку диалогов*/
     

    let state = props.store.getState().dialogsPage;/*получаем стейт из пропсов через гет стейт так он является приватным*/
    let dialogsElements = state.dialogs.map( d => <DialogItem  name={d.name} id={d.id} /> );/*получаем диалогайтемсы путем мапинга(перерисовки массива данных в jsx посты)*/
    let massagesElements = state.messages.map( m => <Message message ={m.message} />);/*получаем сообщения из стейта путем мапинга массива сообщений в jsx элементы*/
    let newMessageBody = state.newMessageBody; /*получаем введенное сообщение из стейта*/ 


    let newMessageElement = React.createRef();/*создаем ссылку которая ссылается на текстареа*/
   
    let onSendMessageClick =() =>{/*функция отправки сообщения по клику*/
    let text = newMessageElement.current.value;/*получаем текст введенный пользоваталем через доступ к нативному value*/
    props.store.dispatch(sendMessageCreator());/*вызываем меседжкриейтор*/
    }

    let onNewMessageChange =(e)=>{/*функция принимающая текст сообщения из текстареа через е ,кот записывает его в переменную body*/
     let body = e.target.value;
     props.store.dispatch(updateNewMessageBodyCreator(body));/*вызываем экшкриейтор и передаем ему сообщение,там оно проходитусловия и происходит отрисовка соощения*/
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