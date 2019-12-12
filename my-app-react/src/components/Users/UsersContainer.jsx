import React from 'react';
import Users from './Users.jsx';
import {connect} from 'react-redux';
import {followActionCreator, unfollowActionCreator, setUsersActionCreator,setCurrentPageActionCreator, setTotalUsersCountActionCreator} from '../../redux/users-reducer';
import * as axios from 'axios';


class UsersContainer extends React.Component {

  /*constructor (props) {
     super(props);} конструктор главной компоненты происходит по умолчанию*/

    componentDidMount() {
       axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}& count=${this.props.pageSize}`).then(response=> {/*в response приходит ответ от сервера */
      this.props.setUsers(response.data.items);/*смотри через дебаг что приходит в респонс и оотуда вытягиваем-а теперь мы их берем этих юзеров с сервера и сетаем(вставляем) в наш стейт!!*/
      this.props.setTotalUsersCount(response.data.totalCount);
    });/*data.items-это наши юзеры*/
    
    }



    onPageChanged = (pageNumber)=> {/*брем текущую страницу с сервера*/
      this.props.setCurrentPage(pageNumber);
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}& count=${this.props.pageSize}`).then(response=> {/*в response приходит ответ от сервера */
      this.props.setUsers(response.data.items)});
    }




    render () {
   return <Users totalUsersCount={this.props.totalUsersCount} 
                 pageSize={this.props.pageSize}
                 currentPage={this.props.currentPage}
                 onPageChanged={this.onPageChanged}
                 users={this.props.users}
                 follow={this.props.follow}
                 unfollow={this.props.unfollow}/> 
  }
}

let mapStateToProps = (state) => {/*функция принимает весь глобальный state и возвращает объект только стеми данными которые нам реально нужны */
    return {
       users: state.usersPage.users,/* мы внедряем юзеров в стейт и тогда он нам возвращается (flux) и мы их отрисовываем мы возвращаем наш список пользователей из стейта*/
       pageSize:state.usersPage.pageSize,/*получаем значение в компоненту через пропсы из редьюсера*/
       totalUsersCount:state.usersPage.totalUsersCount,/*получаем значение в компоненту через пропсы из редьюсера*/
       currentPage:state.usersPage.currentPage/*получаем значение в компоненту через пропсы из редьюсера*/
    }
    /*поэтому в Users в пропсах будет сидеть users*/
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

    	},
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountActionCreator(totalCount));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);