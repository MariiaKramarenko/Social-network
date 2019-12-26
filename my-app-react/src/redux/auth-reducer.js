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
           ...action.data, /*перезатрем таким образом те данные  userId:null , email:null ,login:null  которые сидят в стейте*/
           isAuth:true
          };/*сделаем data объектом с этитими данными см. ниже */
        }

	    default:
    return state;
}
}

export const setAuthUserData = (userId,email,login) =>({type:SET_USER_DATA, data: {userId,email,login} })/*экшнкриэйтор для отправки сообщения*/


export default authReducer;
