import {createStore, combineReducers} from 'redux';/*импортируем из библиотеки редакс*/
import profileReducer from "./profile-reducer.js";/*импортируем редьюсеры*/
import dialogsReducer from "./dialogs-reducer.js";
import sidebarReducer from "./sidebar-reducer.js";
import usersReducer from "./users-reducer.js";


let reducers = combineReducers({/*это как бы наш стейт и каждый редьюсер для каждой странички*/
     profilePage: profileReducer,
     dialogsPage: dialogsReducer,
     sideBar: sidebarReducer,
     usersPage: usersReducer/*привязываем странице его редьюсер*/


});/*функция склеивания/смешивания редьюсеров*/

let store = createStore(reducers);/*функция,создающая стор - отдаем редьюсеры стору*/


export default store;