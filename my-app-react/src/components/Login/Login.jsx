import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';

/*Field-компонента,пришедшая к нам их редакс-форм
name-считывает введенные значение и называет данный инпут
component-обозначает тип 
handleSubmit-обрабатывает форму,приходит из пропсов которые прокидывает хок reduxForm ()()
*/
const LoginForm = (props) => {
  return <form onSubmit={props.handleSubmit} >
  			<div>
  				<Field validate={[required]} placeholder={"Email"} name={"email"} component={Input} />
  			</div>
  			<div>
  				<Field  validate={[required]} placeholder={"Password"} name={"password"} type={"password"} component={Input}/>
  			</div>
  			<div>
  				<Field type={"checkbox"} name={"rememberMe"} component={Input} /> remember me
  			</div>
  			<div>  
  				<button>Login</button>
  			</div>
  		</form>
}

const LoginReduxForm = reduxForm({/*вызываем хок -см документацию*/
      form: 'login' /*уникальное имя для данной формы*/
})(LoginForm)/*второй парметр- форма,вокруг которой этот хок создаст контейнерную компоненту*/


const Login = (props) => {
	const onSubmit = (formData) =>{/*сюда прийдут все значения из формы*/
        console.log(formData);/*выведем для наглядности данные кот попадают в formData*/
        props.login(formData.email, formData.password, formData.rememberMe);/*вызываем логинизатор-коллбек, раскукожили formData - все эти параметры сидят в ней (см. f12)*/
	}
  return <div>
  			<h2>LOGIN</h2>
        	<LoginReduxForm onSubmit={onSubmit}/>
        </div>
}

export default connect(null, {login} ) (Login);/*null-потому что нет mapStateToProps , {Login}-коллбек кот диспатчит вызов санккриетора*/