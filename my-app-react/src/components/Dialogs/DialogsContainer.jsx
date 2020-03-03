import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import Message from './Message/Message';
import DialogItem from './DialogItem/DiialogItem';
import {sendMessageCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

/*этими двумя функциями мы настраиваем наш connect */
let mapStateToProps =(state)=>{/* тут присваиваем свойства ,цель-превратить часть стейта в пропсы для компоненты*/
   return {
      dialogsPage: state.dialogsPage
   }
}

let mapDispatchToProps = (dispatch) => {/*тут передадим коллбеки коллбеки*/
    return {
       sendMessage: (newMessageBody) => { 
        dispatch(sendMessageCreator(newMessageBody));      
       }
    }
}


/*закомментированная логика ниже заменена на функцию compose*/

/*let AuthRedirectComponent = withAuthRedirect(Dialogs);/*оборачиваем в хок компоненту Dialogs в хоку будет происходить редирект
на логин если isAuth:false*/

/*connect-возвращает нам новую контейнерную компоненту*/
/*const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);/*вызываем функцию два раза она создает контейнерную компоненту 
и внутри вызывает переданную ей во вторых скобках-презентационную*/
/*библиотека connect вернет нам в этом случае функциональную компоненту для нашей презентационной Dialogs
то есть нам уже не нужно создавать контейнерные компоненты вручную,за нас это сделает connect

первым вызовом этой функции мы кк бы настраиваем нашу контейнерную компоненту

внутырь презентационной компоненты в качестве пропсов будут переданы f1 f2 
и соответсвенно свойства которые  сидят в этих объектах
*/


export default compose(
  connect(mapStateToProps,mapDispatchToProps),
 withAuthRedirect
  )(Dialogs);/*функция компоуз-берет Dialogs закидывает в withAuthRedirect и полученный результат закидывает в connect*/
