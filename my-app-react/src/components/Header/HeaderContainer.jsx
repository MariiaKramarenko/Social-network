import React from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {getAuthUserData, logout} from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {/*классовая компонента Header*/

     componentDidMount() {/*метод жизненного цикла*/
     this.props.getAuthUserData();/*из пропсов получаем санк криетор*/
          }

     render () { /*вызываем компоненту Header*/
        return  <Header {...this.props} />
		
     }	
}


const mapStateToProps = (state) =>({/*передаем данной компоненте isAuth и login как пропсы*/
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});


export default connect (mapStateToProps, {getAuthUserData, logout}) (HeaderContainer);