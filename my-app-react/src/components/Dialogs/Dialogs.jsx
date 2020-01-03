import React from 'react';
import s from './Dialogs.module.css';
import {NavLink,Redirect} from 'react-router-dom';
import Message from './Message/Message';
import DialogItem from './DialogItem/DiialogItem';


const Dialogs = (props) => {/*константа отвечающая за отлисовку диалогов*/
     

    let state = props.dialogsPage;/*получаем dialogsPage из пропсов */
    let dialogsElements = state.dialogs.map( d => <DialogItem  name={d.name}  key={d.id} id={d.id} /> );
    /*получаем диалогайтемсы путем мапинга(перерисовки массива данных в jsx посты)*/
    let massagesElements = state.messages.map( m => <Message message ={m.message} key={m.id} />);
    let newMessageBody = state.newMessageBody; 


    let newMessageElement = React.createRef();/*создаем ссылку которая ссылается на текстареа*/
   
    let onSendMessageClick =() =>{/*функция отправки сообщения по клику -сюда передаем коллбеком люгику*/
    let text = newMessageElement.current.value;/*получаем текст введенный пользоваталем через доступ к нативному value*/
    props.sendMessage();
    }

    let onNewMessageChange =(e)=>{/*функция принимающая текст сообщения из текстареа через е ,кот записывает его в переменную body*/
     let body = e.target.value;
     props.updateNewMessageBody(body);
    }
    if (props.isAuth == false) return <Redirect to='/login' />/*проверка на наличие залогиненности для редиректа*/
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