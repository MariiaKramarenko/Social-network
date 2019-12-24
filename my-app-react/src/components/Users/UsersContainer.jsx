import React from 'react';
import Users from './Users.jsx';
import {connect} from 'react-redux';
import {follow, unfollow, setUsers,setCurrentPage, setTotalUsersCount,toggleIsFetching,toggleFollowingProgress} from '../../redux/users-reducer';
import * as axios from 'axios';
import Preloader from '../common/Preloader/Preloader.jsx';
import {usersAPI} from '../../api/api.js';


class UsersContainer extends React.Component {

  /*constructor (props) {
     super(props);} конструктор главной компоненты происходит по умолчанию*/

    componentDidMount() {
      this.props.toggleIsFetching(true);
      usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {/*в response приходит ответ от сервера */
      this.props.toggleIsFetching(true);/*убираем прелоадер*/
      this.props.setUsers(data.items);/*смотри через дебаг что приходит в респонс и оотуда вытягиваем-а теперь мы их берем этих юзеров с сервера и сетаем(вставляем) в наш стейт!!*/
      this.props.setTotalUsersCount(data.totalCount);
    });/*data.items-это наши юзеры*/
    
    }



    onPageChanged = (pageNumber) => {/*брем текущую страницу с сервера*/
      this.props.setCurrentPage(pageNumber);
      this.props.toggleIsFetching(true);/*ставим прелоадер*/
      usersAPI.getUsers(pageNumber, this.props.pageSize).then(data=> {/*в response приходит ответ от сервера */
     
      this.props.toggleIsFetching(false);/*убираем прелоадер*/
      this.props.setUsers(data.items)});
    }




    render () {
   return <div>
                {this.props.isFetching ? <Preloader /> : null } 

                <Users totalUsersCount={this.props.totalUsersCount} 
                 pageSize={this.props.pageSize}
                 currentPage={this.props.currentPage}
                 onPageChanged={this.onPageChanged}
                 users={this.props.users}
                 follow={this.props.follow}
                 unfollow={this.props.unfollow}
                 toggleFollowingProgress={this.props.toggleFollowingProgress}
                followingInProgress={this.props.followingInProgress}
                 /> 
                }
          </div>
  }
}

let mapStateToProps = (state) => {/*функция принимает весь глобальный state и возвращает объект только стеми данными которые нам реально нужны */
    return {
       users: state.usersPage.users,/* мы внедряем юзеров в стейт и тогда он нам возвращается (flux) и мы их отрисовываем мы возвращаем наш список пользователей из стейта*/
       pageSize:state.usersPage.pageSize,/*получаем значение в компоненту через пропсы из редьюсера*/
       totalUsersCount:state.usersPage.totalUsersCount,/*получаем значение в компоненту через пропсы из редьюсера*/
       currentPage:state.usersPage.currentPage,/*получаем значение в компоненту через пропсы из редьюсера*/
       isFetching: state.usersPage.isFetching,/*просовываем значение*/
       followingInProgress: state.usersPage.followingInProgress
    }
    /*поэтому в Users в пропсах будет сидеть users*/
}



export default connect(mapStateToProps,{
        follow,
        unfollow,
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        toggleIsFetching,
        toggleFollowingProgress
    })(UsersContainer);