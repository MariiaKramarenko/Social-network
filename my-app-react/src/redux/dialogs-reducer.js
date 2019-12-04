const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    messages: [
      { id: 1, message: 'hi' },
      { id: 2, message: 'How is you project?' },
      { id: 3, message: 'Yep' }
    ],
    dialogs: [
      { id: 1, name: 'Mariya' },
      { id: 2, name: 'Arek' },
      { id: 3, name: 'Valeriy' },
      { id: 4, name: 'Kostiantym' },
      { id: 5, name: 'Anna' },
      { id: 6, name: 'Ekaterina' }
    ],

    newMessageBody:" "/*место,куда мы записываем новое значение вводимое нами в текстареа как сообщение*/
};

const dialogsReducer = (state = initialState, action) => {/*передаем стейту его значение начальное!*/
  /*редьюсер для диалогов, возвращает измененный стейт*/

   let stateCopy = {
    ...state,
    messages : [...state.messages]

  };/*делаем копию стейта и массива сообщений */


	switch(action.type){/*свич-условие по кейсу action.type*/

		case UPDATE_NEW_MESSAGE_BODY:/*если action.type === UPDATE_NEW_MESSAGE_BODY то*/
          
            stateCopy.newMessageBody = action.body;/*берем из стейта место для сообщения введеного пользователем и засовываем в него сообщение body которое пришло нам в экшене через экшнкриейтор*/
            return stateCopy;/*ретурню стейт чтобы кейс не "проваливался" ему нужна точка проверки*/

        case SEND_MESSAGE:/*если action.type === SEND_MESSAGE то*/
        let body = stateCopy.newMessageBody;/*записываем в body значение введенного сообщения*/
          stateCopy.newMessageBody='';/*зануляем строку ввода сообщения после его добавления*/
          stateCopy.messages.push({id:4, message: body});/*пушим(вставляем в конец массива соощений) сообщение введенное пользователем*/
        return stateCopy;/*ретурним стейт для точки провеки свчиа чтобы он не проваливался*/

	    default:/*длля свича по дефолту обязателньо значение - ретурним стейт так как он может быть возвращен и неизмененным*/
    return state;
}
}

export const sendMessageCreator = () =>({type:SEND_MESSAGE})/*экшнкриэйтор для отправки сообщения*/

export const updateNewMessageBodyCreator = (body) =>({type:UPDATE_NEW_MESSAGE_BODY, body:body })/*экшнкриейтор для добавления нового сообщения*/

export default dialogsReducer;

