import React from 'react';
import s from './Profile.module.css';
import Profile from './Profile';
import {connect} from 'react-redux';
import * as axios from 'axios';
import {getUserProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';



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
       return (
        <Profile {...this.props} profile={this.props.profile} />)
    }
}

/*обязательно,когда наша функция возвращает объект,мы должны ставить круглые скобки*/
let mapStateToProps = (state) => ({
	profile: state.profilePage.profile
});


let WithUrlDataContainerComponent = withRouter(ProfileContainer);/*оборачиваем контейнерную компоненту визроутом*/
/*работает по типу коннекта,создаем контейнрную комопоненту для ProfileContainer и оборачиваем нею ее*/


export default connect(mapStateToProps,{getUserProfile})(WithUrlDataContainerComponent);

