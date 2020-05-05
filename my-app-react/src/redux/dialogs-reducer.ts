import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messages: [
      { id: 1, message: 'hi' },
      { id: 2, message: 'How is you project?' },
      { id: 3, message: 'Yep' }
    ]as Array <MessageType>,
    dialogs: [
      { id: 1, name: 'Mariya' },
      { id: 2, name: 'Arek' },
      { id: 3, name: 'Valeriy' },
      { id: 4, name: 'Kostiantym' },
      { id: 5, name: 'Anna' },
      { id: 6, name: 'Ekaterina' }
    ]as Array<DialogType>
};

///////TYPES////////////////////////////////
export type InitialStateType = typeof initialState;//тип для стейта

type DialogType = {
    id: number
    name: string
}
type MessageType ={
    id:number
    message:string
}

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}
type ActionTypes = SendMessageCreatorActionType;//типизация для всех экшенов общая
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;//так типизируем любую санку
///////END OF TYPES/////////////////////////

const dialogsReducer = (state = initialState, action:ActionTypes):InitialStateType => {/*передаем стейту его значение начальное!*/
  /*редьюсер для диалогов, возвращает измененный стейт*/
	switch(action.type){/*свич-условие по кейсу action.type*/
        case SEND_MESSAGE:/*если action.type === SEND_MESSAGE то*/
         let body = action.newMessageBody;/*записываем в body значение введенного сообщения*/
         return {
         ...state,
         messages : [...state.messages, {id:4, message: body}]/*а тут нам нужна так же копия сооьщений так как мы их тут добавляем*/
         };/*вместо push мы просто пишем через запятую то что мы добавляем в конец*/
        
	    default:/*для свича по дефолту обязателньо значение - ретурним стейт так как он может быть возвращен и неизмененным*/
    return state;
}
}

export const sendMessageCreator = (newMessageBody:string):SendMessageCreatorActionType =>({type:SEND_MESSAGE, newMessageBody})/*экшнкриэйтор для отправки сообщения*/


export default dialogsReducer;

