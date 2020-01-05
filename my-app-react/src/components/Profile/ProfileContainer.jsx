import React from 'react';
import s from './Profile.module.css';
import Profile from './Profile';
import {connect} from 'react-redux';
import * as axios from 'axios';
import {getUserProfile} from '../../redux/profile-reducer';
import {withRouter, Redirect} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

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

/*обязательно,когда наша функция возвращает объект,мы должны ставить круглые скобки*/
let mapStateToProps = (state) => ({
	profile: state.profilePage.profile
});




export default compose(
  connect(mapStateToProps,{getUserProfile}),
  withRouter,
  withAuthRedirect
  )(ProfileContainer);

