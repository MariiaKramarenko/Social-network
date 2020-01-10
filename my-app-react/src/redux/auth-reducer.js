import {authAPI} from '../api/api.js';
const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
   userId:null ,
   email:null ,
   login:null ,
   isAuth:false

};

const authReducer = (state = initialState, action) => {
/*всегда все данные которые нужны для преобразования в reducer всегда лежат в action!*/

	switch(action.type){
    
		case SET_USER_DATA :{
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

export const getAuthUserData = () => (dispatch) => {/*санк-криейтор для получения данных о залогиненном юзере*/
   authAPI.me()/*запрос на сервер на me*/
      .then(response=> {/*в ответе (респонсе) от сервера сидят даннные*/
          if(response.data.resultCode === 0 ){/*если от сервера пришел ответ 0 значит успешен запрос*/
            let {id,email,login} = response.data.data;/*а значит что мы  берем все данные из респонса сервера и диспатчим(вызываем)их установку*/
            dispatch(setAuthUserData(id,email,login,true));/*напомню что setAuthUserData записывает в state пришедшие ему данные юзера (мы логинимся в апишке и там в куке они сидят) */
          }
        });

}


export const login = (email, password, rememberMe) => (dispatch) => {/*санк-криейтор для получения данных для входа(логина)*/
   authAPI.login(email, password, rememberMe)/*запрос на сервер на login и передаем данные для логинизации*/
      .then(response=> {/*в ответе (респонсе) от сервера сидят даннные*/
          if(response.data.resultCode === 0 ){/*если от сервера пришел ответ 0 значит успешен запрос*/
             dispatch(getAuthUserData())/*диспатчим getAuthUserData кот. получает данные*/
          }
        });
}


export const logout = () => (dispatch) => {/*санк-криейтор для вылогинизации из соцсети*/
   authAPI.logout()/*запрос на сервер на logout */
      .then(response=> {/*в ответе (респонсе) от сервера сидят даннные*/
          if(response.data.resultCode === 0 ){/*если от сервера пришел ответ 0 значит успешен запрос*/
            dispatch(setAuthUserData(null,null,null,false));/*зануляем все поля с данныеми когда вылогиниваемся*/
          }
        });
}


export default authReducer;

