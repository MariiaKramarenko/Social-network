import React from 'react';
import s from './Profile.module.css';
import Profile from './Profile';
import {connect} from 'react-redux';
import * as axios from 'axios';
import {setUserProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';

class ProfileContainer extends React.Component {
/*все пропсы контейнерной приходят в ее дочернюю-презентационную,передать все пропсы можно способом {...this.props.} */
   componentDidMount() {
      axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
      .then(response=> {  
      this.props.setUserProfile(response.data);
  });

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


withRouter(ProfileContainer);/*оборачиваем контейнерную компоненту визроутом*/



export default connect(mapStateToProps, {setUserProfile} ) (ProfileContainer);