import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import Message from './Message/Message';
import DialogItem from './DialogItem/DiialogItem';
import {sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import StoreContext from './../../../src/StoreContext';



const DialogsContainer = () => {/*константа отвечающая за отрисовку диалогов*/

	return <StoreContext.Consumer> 
    {(store) => {/*!!!!!!!!!Фигурная скобка обязательно должна стоять на новой строке!!!!!!!!!!!!!!!*/
     /*StoreContext.Consumer - потребитель контекста*/ 
    let state = store.getState().dialogsPage;
    let newMessageElement = React.createRef();/*создаем ссылку которая ссылается на текстареа*/
   
    let onSendMessageClick =(text) =>{/*передаем text из Dialogs.jsx*/
    store.dispatch(sendMessageCreator(text));/*вызываем меседжкриейтор - то есть делаем эту компоненту функциональной*/
    }

    let onNewMessageChange =(body)=>{/*передаем body из Dialogs.jsx - логику оставляем здесь а компонента Dialogs.jsx становится презентационной*/
     store.dispatch(updateNewMessageBodyCreator(body));/*вызываем экшкриейтор и передаем ему сообщение,там оно проходитусловия и происходит отрисовка соощения*/
    }
    return <Dialogs updateNewMessageBody = {onNewMessageChange} sendMessage={onSendMessageClick}  dialogsPage={state} />
		}
     }
     </StoreContext.Consumer>  
 
        
}

export default DialogsContainer;