import {applyMiddleware, combineReducers, compose, createStore} from "redux";/*импортируем из библиотеки редакс*/
import profileReducer from "./profile-reducer";/*импортируем редьюсеры*/
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";/*Middleware импорт слоя для обработки санок*/
import { reducer as formReducer} from "redux-form";/*импорт редьюсера для создания форм*/
import appReducer from "./app-reducer";
//////TYPES/////////////////////////
//тип созданный на основе reducers (то есть тип глобального root reducer)
type ReducersType = typeof reducers;//возвращает global state
export type AppStateType = ReturnType<ReducersType>;//глобальный типизированный стейт всего приложения
//то есть: мы как бы определяем то что возвращает глобальный редьюсер ReducersType

////////////////////////////////////

let reducers = combineReducers({/*это как бы наш стейт и каждый редьюсер для каждой странички*/
     profilePage: profileReducer,
     dialogsPage: dialogsReducer,
     sideBar: sidebarReducer,
     usersPage: usersReducer,
     auth: authReducer,
     form: formReducer, /*здесь должно быть написано именно form*/
     app: appReducer/*привязываем странице его редьюсер*/
     

});/*функция склеивания/смешивания редьюсеров*/
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware)));

//@ts-ignore
window.__store__ = store;

export default store;