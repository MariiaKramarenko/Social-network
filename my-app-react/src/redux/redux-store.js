import {applyMiddleware,createStore, combineReducers} from 'redux';/*импортируем из библиотеки редакс*/
import profileReducer from "./profile-reducer.js";/*импортируем редьюсеры*/
import dialogsReducer from "./dialogs-reducer.js";
import sidebarReducer from "./sidebar-reducer.js";
import usersReducer from "./users-reducer.js";
import authReducer from "./auth-reducer.js";
import thunkMiddleware from "redux-thunk";/*Middleware импорт слоя для обработки санок*/


let reducers = combineReducers({/*это как бы наш стейт и каждый редьюсер для каждой странички*/
     profilePage: profileReducer,
     dialogsPage: dialogsReducer,
     sideBar: sidebarReducer,
     usersPage: usersReducer,
     auth: authReducer
     /*привязываем странице его редьюсер*/
     

});/*функция склеивания/смешивания редьюсеров*/

let store = createStore(reducers, applyMiddleware(thunkMiddleware));/*у стора есть теперь промеж уровень для обработки thunk*/
/*функция,создающая стор - отдаем редьюсеры стору -а именно*/

window.store = store;

export default store;