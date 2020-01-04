import React from 'react';
import {Redirect} from 'react-router-dom';
/*суть хока-возвращаем один и тот же хок для разных компонент которые приходят в него как целевые*/
export const withAuthRedirect =(Component)=>{/*функция кот принимает в себя компоненту кот будет отрисована*/
     
     class RedirectComponent extends React.Component {/*создаем внутри класс */
     	render(){/*внутри класса делаем логику редиректа*/
     		if(!this.props.isAuth) return <Redirect to='/login' />
             return <Component {...this.props} />/*отрисовывание компоненты и прокидывание в нее пропсов*/
     }
 }
     return RedirectComponent;
}

/*если в пропсах isAuth равен false то ретурим 
редирект компоненту Redirect на страницу login*/