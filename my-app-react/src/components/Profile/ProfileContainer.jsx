import React from 'react';
import s from './Profile.module.css';
import Profile from './Profile';
import {connect} from 'react-redux';
import * as axios from 'axios';
import {getUserProfile, getStatus, updateStatus} from '../../redux/profile-reducer';
import {withRouter, Redirect} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

class ProfileContainer extends React.Component {
/*все пропсы контейнерной приходят в ее дочернюю-презентационную,передать все пропсы можно способом {...this.props.} */

   componentDidMount() {
    let userID = this.props.match.params.userID;
    if(!userID) {/*если мы не кликнули по пользователю,то загрузим автар нашего2го пользователя -это Димыч*/
      userID = this.props.autorizedUserId;
      if(!userID){
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userID);/*запрашиваем профиль юзера*/
    this.props.getStatus(userID);/*запрашиваем статус юзера*/
   }

   render() {
      if (this.props.isAuth == false) return <Redirect to='/login' />
       return (
        <Profile {...this.props} 
        profile={this.props.profile} 
        status={this.props.status} 
        updateStatus={this.props.updateStatus}/>)
    }
}

/*обязательно,когда наша функция возвращает объект,мы должны ставить круглые скобки*/
let mapStateToProps = (state) => ({
	profile: state.profilePage.profile,/*прокидываем профиль сюда пропсами из стейта*/
  status:state.profilePage.status,/*прокидываем статус пропсами сюда из стейта*/
  autorizedUserId: state.auth.userId,/*узнаем мой айди для высвечивания моего профиля в случае если кликнутого нет*/
  isAuth:state.auth.isAuth/*взяли чтобы знать сост авторизации для высвечиванияпрофиля в условии когда того на кого мы кликнули нет */
});




export default compose(/*функция компоуз берет ProfileContainer оборачивает в withAuthRedirect 
  результат этого оборачивает в withRouter
  результат этого оборачивает в connect*/
  connect(mapStateToProps,{getUserProfile, getStatus, updateStatus}),
  withRouter,
  //withAuthRedirect
  )(ProfileContainer);

