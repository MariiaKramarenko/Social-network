const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';


const dialogsReducer = (state, action) => {/*редьюсер для диалогов, возвращает измененный стейт*/
	switch(action.type){/*свич-условие по кейсу action.type*/
		case UPDATE_NEW_MESSAGE_BODY:/*если action.type === UPDATE_NEW_MESSAGE_BODY то*/
            state.newMessageBody = action.body;/*берем из стейта место для сообщения введеного пользователем и засовываем в него сообщение body которое пришло нам в экшене через экшнкриейтор*/
            return state;/*ретурню стейт чтобы кейс не "проваливался" ему нужна точка проверки*/
        case SEND_MESSAGE:/*если action.type === SEND_MESSAGE то*/
        let body = state.newMessageBody;/*записываем в body значение введенного сообщения*/
          state.newMessageBody='';/*зануляем строку ввода сообщения после его добавления*/
          state.messages.push({id:4, message: body});/*пушим(вставляем в конец массива соощений) сообщение введенное пользователем*/
        return state;/*ретурним стейт для точки провеки свчиа чтобы он не проваливался*/
	    default:/*длля свича по дефолту обязателньо значение - ретурним стейт так как он может быть возвращен и неизмененным*/
  return state;
}
}

export const sendMessageCreator = () =>({type:SEND_MESSAGE})/*экшнкриэйтор для отправки сообщения*/

export const updateNewMessageBodyCreator = (body) =>({type:UPDATE_NEW_MESSAGE_BODY, body:body })/*экшнкриейтор для добавления нового сообщения*/

export default dialogsReducer;

