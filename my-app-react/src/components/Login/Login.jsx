import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
/*Field-компонента,пришедшая к нам их редакс-форм
name-считывает введенные значение и называет данный инпут
component-обозначает тип 
handleSubmit-обрабатывает форму,приходит из пропсов которые прокидывает хок reduxForm ()()
*/
const LoginForm = (props) => {
  return <form onSubmit={props.handleSubmit} >
  			<div>
  				<Field validate={[required]} placeholder={"Login"} name={"login"} component={Input} />
  			</div>
  			<div>
  				<Field  validate={[required]} placeholder={"Password"} name={"password"} component={Input}/>
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


const Login = () => {
	const onSubmit = (formData) =>{/*сюда прийдут все значения из формы*/
        console.log(formData);/*выведем для наглядности данные кот попадают в formData*/
	}
  return <div>
  			<h2>LOGIN</h2>
        	<LoginReduxForm onSubmit={onSubmit}/>
        </div>
}
export default Login;