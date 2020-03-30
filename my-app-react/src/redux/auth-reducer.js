import {authAPI, securityAPI} from '../api/api.js';
import {stopSubmit} from 'redux-form';

//редьюсер авторизации в нашем приложении

const SET_USER_DATA = 'my-first-network/auth/SET_USER_DATA';//уникализируем путь для срабатывания action
const GET_CAPTCHA_URL_SUCCESS = 'my-first-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {//начальный стейт с данными для авторизации в приложении
   userId:null ,
   email:null ,
   login:null ,
   isAuth:false,
   captchaUrl: null

};

const authReducer = (state = initialState, action) => {//компонента-редьюсер
/*всегда все данные которые нужны для преобразования в reducer всегда лежат в action!*/
	switch(action.type){ 
    case GET_CAPTCHA_URL_SUCCESS :   
		case SET_USER_DATA : {
          return {
           ...state,
           ...action.payload, /*перезатрем таким образом те данные  userId:null , email:null ,login:null  которые сидят в стейте*/
          };/*сделаем data объектом с этитими данными см. ниже */
        }
	    default:
    return state;
}
}

export const setAuthUserData = (userId,email,login,isAuth) =>({type:SET_USER_DATA, payload: {userId,email,login,isAuth} })/*экшнкриэйтор для отправки сообщения*/

//экшнкриетор для получения капчи с сервера
export const getCaptchaUrlSuccess= (captchaUrl) =>({
  type:GET_CAPTCHA_URL_SUCCESS, payload:{captchaUrl}//диспатчим(вставляем) в стейт полученный url санки с сервера
});



export const getAuthUserData = () => async (dispatch) => {/*санк-криейтор для получения данных о залогиненном юзере*/
   /*помним что как результат работы асинхронной функции вернется промис*/
   let response = await authAPI.me();/*запрос на сервер на me, ожидаем промис с пом await*/
     /*присваиваем переменной rensponse тот response кот вернул нам await*/
    if(response.data.resultCode === 0 ){/*если от сервера пришел ответ 0 значит успешен запрос*/
      let {id,email,login} = response.data.data;/*а значит что мы  берем все данные из респонса сервера и диспатчим(вызываем)их установку*/
    dispatch(setAuthUserData(id,email,login,true));/*напомню что setAuthUserData записывает в state пришедшие ему данные юзера (мы логинимся в апишке и там в куке они сидят) */
    }
}





export const login = (email, password, rememberMe) => async (dispatch) => {/*санк-криейтор для получения данных для входа(логина)*/
   /*!!!!!!!!!!!ВАЖНО: функция кот содержит await должна быть async!!!!!!!!!!*/
   let response = await authAPI.login(email, password, rememberMe);/*запрос на сервер на login и передаем данные для логинизации*/
    /*присваиваем переменной rensponse тот response кот вернул нам await*/
    if(response.data.resultCode === 0 ){/*если от сервера пришел ответ 0 значит успешен запрос*/
      //значит мы успешно авторизовались
      dispatch(getAuthUserData())/*диспатчим getAuthUserData кот. получает данные*/
    } else {//ответ о сервера для капчи
      /*обработка ввода неверных данных в форму логина*/
      if(response.data.resultCode === 10){
        dispatch(getCaptchaUrl());//запросится капча и запшется в стейт
      }
      let messages = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";/*берем значение строчное ошибки из данных от сервера,там они сидят в []*/
    /*берем первое значение сообщения обошибке(приходит от сервера и на всякий случай ставим свою надпись об ошибке*/
    dispatch(stopSubmit("login", {_error: messages}));/*первое значение-какую форму мы останавливаем на проверку(_error-значение для всех полей общее),второй парам- объект с проверяемыми значениями(поля формы)*/
    }

}

//санк криетор для асинхронной операции -запрпашивает капчу с сервера и диспатчт санку которая этот урл записывает в стейт
export const getCaptchaUrl = () => async(dispatch) =>{
   const response = await securityAPI.getCaptchaUrl();
   const captchaUrl = response.data.url;//получаем url капчи с сервера
   dispatch(getCaptchaUrlSuccess(captchaUrl));//диспатчим результат синхранной операции санки в стейт
}




export const logout = () => async (dispatch) => {/*санк-криейтор для вылогинизации из соцсети*/
   let response = await authAPI.logout();/*запрос на сервер на logout и запись зарезолвенного прописа в response*/
/*в ответе (респонсе) от сервера сидят даннные*/
    if(response.data.resultCode === 0 ){/*если от сервера пришел ответ 0 значит успешен запрос*/
        dispatch(setAuthUserData(null,null,null,false));/*зануляем все поля с данныеми когда вылогиниваемся*/
    }

}


export default authReducer;

