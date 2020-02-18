import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getAuthUserData} from "./auth-reducer";
//редьюсер инициализации всего приложения
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false//начальное значение инициализации
};

const appReducer = (state = initialState, action) => {// компонента-редьюсер кот проверяет значение initialized
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


export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])//если все промисы пришли успешно то диспатчим initializedSuccess кот возыращает значение true
        .then(() => {
            dispatch(initializedSuccess());
        });
}


export default appReducer;