import React from 'react';
import s from './Profile.module.css';
import Profile from './Profile';
import {connect} from 'react-redux';
import * as axios from 'axios';
import {getUserProfile} from '../../redux/profile-reducer';
import {withRouter, Redirect} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';


class ProfileContainer extends React.Component {
/*все пропсы контейнерной приходят в ее дочернюю-презентационную,передать все пропсы можно способом {...this.props.} */

   componentDidMount() {
    let userID = this.props.match.params.userID;
    if(!userID) {/*если мы не кликнули по пользователю,то загрузим автар нашего2го пользователя -это Димыч*/
      userID = 2;
    }
    this.props.getUserProfile(userID);
   }

   render() {
      if (this.props.isAuth == false) return <Redirect to='/login' />
       return (
        <Profile {...this.props} profile={this.props.profile} />)
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer);/*оборачиваем в хок нашу компоненту 
чтобы сделать редирект в случае isAuth:false 
логика редиректа находится в хоке*/


let mapStateToPropsForRedirect = (state) => ({/*пропсы для хока*/
  isAuth:state.auth.isAuth
});

AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent);




/*обязательно,когда наша функция возвращает объект,мы должны ставить круглые скобки*/
let mapStateToProps = (state) => ({
	profile: state.profilePage.profile
});


let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);/*оборачиваем контейнерную компоненту визроутом
чтобы иметь доступ к данным url*/
/*работает по типу коннекта,создаем контейнрную комопоненту для ProfileContainer и оборачиваем нею ее*/


export default connect(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent);

