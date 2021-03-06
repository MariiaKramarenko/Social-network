import React from 'react';
import Users from './Users';
import {connect, DefaultRootState} from 'react-redux';
import {follow, unfollow,setCurrentPage,toggleFollowingProgress, getUsers} from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {getPageSize, getUsersAll, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress} from '../../redux/users-selectors';
import {getUsersSuperSelector} from '../../redux/users-selectors';
import {UserType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

/////TYPES////////////////////////////////
type OwPropsType={//типизация для пропсов (которые переданы через аттрбуты)
    pageTitle:string
}
type MapStatePropsType={//типизация для пропсов (данных из стейта)
    currentPage:number
    pageSize:number
    isFetching:boolean
    totalUsersCount:number
    users: Array<UserType>
    followingInProgress: Array<number>
}
type MapDispatchPropsType={//типизация для пропсов (колбеков)
    follow:(userId:number)=> void
    unfollow: (userId:number)=> void
    getUsers: (currentPage:number, pageSize:number)=> void


}
type PropsType= MapDispatchPropsType & MapStatePropsType & OwPropsType;//объединяем все наши пропсы в один общий объект

//////END OF TYPES///////////////////////

//как типизировать классовую компоненту React.Component<PropsType>
class UsersContainer extends React.Component<PropsType> {

  /*constructor (props) {
     super(props);} конструктор главной компоненты происходит по умолчанию*/

    componentDidMount() {
      this.props.getUsers(this.props.currentPage, this.props.pageSize);/*помним,что сюда попадает имнно коллбек!а не сам санккреетор,все за счет connect()()*/
    
    }

    onPageChanged = (pageNumber:number) => {/*брем текущую страницу с сервера*/
      this.props.getUsers(pageNumber, this.props.pageSize);
    
    }

    render () {
   return <div>{<h3>{this.props.pageTitle}</h3>}
                {this.props.isFetching ? <Preloader /> : null }

                <Users totalUsersCount={this.props.totalUsersCount} 
                 pageSize={this.props.pageSize}
                 currentPage={this.props.currentPage}
                 onPageChanged={this.onPageChanged}
                 users={this.props.users}
                 follow={this.props.follow}
                 unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}/>
          </div>
          }
  }

/*let mapStateToProps = (state) => {/*функция принимает весь глобальный state и возвращает объект только стеми данными которые нам реально нужны */
    /*return {
       users: state.usersPage.users,/* мы внедряем юзеров в стейт и тогда он нам возвращается (flux) и мы их отрисовываем мы возвращаем наш список пользователей из стейта*/
       /*pageSize:state.usersPage.pageSize,/*получаем значение в компоненту через пропсы из редьюсера*/
       /*totalUsersCount:state.usersPage.totalUsersCount,/*получаем значение в компоненту через пропсы из редьюсера*/
       /*currentPage:state.usersPage.currentPage,/*получаем значение в компоненту через пропсы из редьюсера*/
       /*isFetching: state.usersPage.isFetching,/*просовываем значение*/
       /*followingInProgress: state.usersPage.followingInProgress
    }
    /*поэтому в Users в пропсах будет сидеть users*/
/*}*/

let mapStateToProps = (state:AppStateType):MapStatePropsType => {//AppStateType-мы создали в redux-store -это глобальный типизированный стейт всего приложения
    return {
       //users: getUsersAll(state),
       users:getUsersSuperSelector(state),/*вызываем селектор,созданный с помощью reselect*/
       pageSize:getPageSize(state),
       totalUsersCount:getTotalUsersCount(state),
       currentPage:getCurrentPage(state),
       isFetching:getIsFetching(state),
       followingInProgress:getFollowingInProgress(state)
    }
}


//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultRootState>
export default  compose(
    //так connect отслеживает чтобы все что в нем прописано придерживалось четкой типизации указанных типов пропсов
  connect<MapStatePropsType, MapDispatchPropsType, OwPropsType, AppStateType>(mapStateToProps,{/*все это попадает в пропсы-коннтект создает пропсы и коллбеки данной компоненте*/
        follow, unfollow, getUsers}), withAuthRedirect)(UsersContainer);




