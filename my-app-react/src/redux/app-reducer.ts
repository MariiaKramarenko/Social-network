import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./auth-reducer";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";
//редьюсер инициализации всего приложения
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


////////////////TYPES/////////////////////////////
export type InitialStateType ={//тип для initialState
    initialized: boolean
}

type InitializedSuccessActionType ={
    type: typeof INITIALIZED_SUCCESS//типом мы должны сделать само значение строки а зачит берем тип данной переменной то есть эту строку
}
type ActionTypes = InitializedSuccessActionType;//общий тип для экшенов в редьюсерах
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
type DispatchType = Dispatch<ActionTypes>;
////////////////END OF TYPES///////////////////////



let initialState:InitialStateType= {//типизация с помощью двоеточия :InitialStateType
    initialized: false//начальное значение инициализации
};
//типизировали возвращаемое значение тип пишем после () перед =>
const appReducer = (state = initialState, action:ActionTypes):InitialStateType => {// компонента-редьюсер кот проверяет значение initialized
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

//типизировали возвращаемое значение
export const initializedSuccess = ():InitializedSuccessActionType  => ({type: INITIALIZED_SUCCESS});

//thunk for initializing our app
export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])//если все промисы пришли успешно то диспатчим initializedSuccess кот возыращает значение true
        .then(() => {
            dispatch(initializedSuccess());
        });
}


export default appReducer;