import React from 'react';
import Users from './Users';
import {connect} from 'react-redux';
import {followActionCreator, unfollowActionCreator, setUsersActionCreator} from '../../redux/users-reducer';

let mapStateToProps = (state) => {/*функция принимает весь глобальный state и возвращает объект только стеми данными которые нам реально нужны */
    return {
       users: state.usersPage.users/* мы внедряем юзеров в стейт и тогда он нам возвращается (flux) и мы их отрисовываем мы возвращаем наш список пользователей из стейта*/
    }/*поэтому в Users в пропсах будет сидеть users*/
}


let mapDispatchToProps = (dispatch) =>{/*передает коллбеки дочерней(презентационной) компоненте Users, она будет их вызывать*/
    return{
    	follow: (userID) =>{/*функция диспатчит результат работы экшнкреатора-то есть диспатчим экшн */
    		dispatch(followActionCreator (userID));
    	},
    	unfollow: (userID) =>{/*функция диспатчит результат работы экшнкреатора-то есть диспатчим экшн */
    		dispatch(unfollowActionCreator  (userID));
    	},
    	setUsers: (users) => {
    		dispatch(setUsersActionCreator(users));

    	}
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Users);