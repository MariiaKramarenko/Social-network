import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {logout} from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {/*классовая компонента Header*/

     render () { /*вызываем компоненту Header*/
        return  <Header {...this.props} />
		
     }	
}


const mapStateToProps = (state) =>({/*передаем данной компоненте isAuth и login как пропсы*/
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});


export default connect (mapStateToProps, {logout}) (HeaderContainer);