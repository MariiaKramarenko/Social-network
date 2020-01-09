import React from 'react';
import s from './Dialogs.module.css';
import {NavLink,Redirect} from 'react-router-dom';
import Message from './Message/Message';
import DialogItem from './DialogItem/DiialogItem';
import {Field, reduxForm} from 'redux-form';
import AddMessageForm from './AddMessageForm/AddMessageForm';



const Dialogs = (props) => {/*константа отвечающая за отлисовку диалогов*/
     

    let state = props.dialogsPage;/*получаем dialogsPage из пропсов */
    let dialogsElements = state.dialogs.map( d => <DialogItem  name={d.name}  key={d.id} id={d.id} /> );
    /*получаем диалогайтемсы путем мапинга(перерисовки массива данных в jsx посты)*/
    let massagesElements = state.messages.map( m => <Message message ={m.message} key={m.id} />);
    let newMessageBody = state.newMessageBody; 
    let newMessageElement = React.createRef();/*создаем ссылку которая ссылается на текстареа*/


    let addNewMessage = (values) => {/*функция добавляет сообщение по срабатыванию onSubmit*/
        props.sendMessage(values.newMessageBody);
    }

    if (!props.isAuth) return <Redirect to='/login' />;/*проверка на наличие залогиненности для редиректа*/
	return(	   
		<div className={s.dialogs}>
			<div className={s.dialogsItems}> 				
                {dialogsElements}              
			</div>
		    <div className={s.messages}>         
                {massagesElements}
            <AddMessageForm onSubmit={addNewMessage} />   
           </div>
         </div>		
		)
}
/*обращаемся к AddMessageFormRedux и говорим,когда ты засабмтишься выполни функцию ={}*/

export default Dialogs;