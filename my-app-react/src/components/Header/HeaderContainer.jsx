import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {setAuthUserData} from '../../redux/auth-reducer';
import {usersAPI, authAPI} from '../../api/api.js';

/*withCredentials:true - настрйки авторизации */
class HeaderContainer extends React.Component {

     componentDidMount() {
     /* this.props.usersAPI.authUser(setAuthUserData);*/
      authAPI.me()
      .then(response=> {
          if(response.data.resultCode === 0 ){
          	let {id,email,login} = response.data.data;
          	this.props.setAuthUserData(id,email,login);
          }
        });
     }

     render () {
        return  <Header {...this.props} />
		
     }	
}


const mapStateToProps = (state) =>({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});


export default connect (mapStateToProps, {setAuthUserData}) (HeaderContainer);