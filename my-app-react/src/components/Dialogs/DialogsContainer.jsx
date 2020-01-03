import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import Message from './Message/Message';
import DialogItem from './DialogItem/DiialogItem';
import {sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';

/*этими двумя функциями мы настраиваем наш connect */
let mapStateToProps =(state)=>{/* тут присваиваем свойства ,цель-превратить часть стейта в пропсы для компоненты*/
   return {
      dialogsPage: state.dialogsPage,
      isAuth: state.auth.isAuth
   }
}

let mapDispatchToProps = (dispatch) => {/*тут передадим коллбеки коллбеки*/
    return {
       sendMessage: (body) => { 
        dispatch(sendMessageCreator(body));
        
    } ,
       updateNewMessageBody:(body) => {
        dispatch(updateNewMessageBodyCreator(body));
    } 

    }
}

/*connect-возвращает нам новую контейнерную компоненту*/
const DialogsContainer = connect (mapStateToProps,mapDispatchToProps) (Dialogs);/*вызываем функцию два раза она создает контейнерную компоненту 
и внутри вызывает переданную ей во вторых скобках-презентационную*/
/*библиотека connect вернет нам в этом случае функциональную компоненту для нашей презентационной Dialogs
то есть нам уже не нужно создавать контейнерные компоненты вручную,за нас это сделает connect

первым вызовом этой функции мы кк бы настраиваем нашу контейнерную компоненту

внутырь презентационной компоненты в качестве пропсов будут переданы f1 f2 
и соответсвенно свойства которые  сидят в этих объектах
*/






export default DialogsContainer;