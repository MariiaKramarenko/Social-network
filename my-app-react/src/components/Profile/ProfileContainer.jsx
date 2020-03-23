import React from 'react';
import s from './Profile.module.css';
import Profile from './Profile';
import {connect} from 'react-redux';
import * as axios from 'axios';
import {getUserProfile, getStatus, updateStatus, savePhoto} from '../../redux/profile-reducer';
import {withRouter, Redirect} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

class ProfileContainer extends React.Component {
/*все пропсы контейнерной приходят в ее дочернюю-презентационную,передать все пропсы можно способом {...this.props.} */
  refreshProfile(){//засунем сюда логику которая дублируется для обновления профиля(реагируем на пропсы когдаменяем кликаем по другому юзеру)
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
   componentDidMount() {//componentDidMount срабатывает один раз,когда компонента вмонтируется поэтому
    this.refreshProfile();//проверяем, что сидит в пропсах,какой айди какго польхователя чтобы высветить его фото и статус
   }

  componentDidUpdate(prevProps, prevState, snapshot) {//поэтому нам нужен метод componentDidUpdate чтобы реагировать на изменения пропсов 
   if(this.props.match.params.userID !=prevProps.match.params.userID){//если айди из текущих пропсов не равна айди из предыдущих пропсов
   this.refreshProfile();//значит делаем рефреш раз они не равны
   //проверяем, что сидит в пропсах,какой айди какго польхователя чтобы высветить его фото и статус
  }
}

   render() {
      if (this.props.isAuth == false) return <Redirect to='/login' />
       return (
        <Profile {...this.props} 
        isOwner={!this.props.match.params.userID}//если мы владелец профиля на ктором мы сейчас(то есть пустой профиль)
        profile={this.props.profile} 
        status={this.props.status} 
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto} //коллбек для отправки выбранной аватарки на сервер
        />)
    }
}

/*обязательно,когда наша функция возвращает объект,мы должны ставить круглые скобки*/
/*let mapStateToProps = (state) => ({
	profile: state.profilePage.profile,/*прокидываем профиль сюда пропсами из стейта*/
  /*status:state.profilePage.status,/*прокидываем статус пропсами сюда из стейта*/
 /* autorizedUserId: state.auth.userId,/*узнаем мой айди для высвечивания моего профиля в случае если кликнутого нет*/
  /*isAuth:state.auth.isAuth/*взяли чтобы знать сост авторизации для высвечиванияпрофиля в условии когда того на кого мы кликнули нет */
/*});*/

let mapStateToProps = (state) => ({
profile: state.profilePage.profile,
status:state.profilePage.status,
autorizedUserId: state.auth.userId,
isAuth:state.auth.isAuth
});



export default compose(/*функция компоуз берет ProfileContainer оборачивает в withAuthRedirect 
  результат этого оборачивает в withRouter
  результат этого оборачивает в connect*/
  connect(mapStateToProps,{getUserProfile, getStatus, updateStatus, savePhoto}),
  withRouter,
  withAuthRedirect
  )(ProfileContainer);

