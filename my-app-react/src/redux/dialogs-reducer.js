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
    ]
};

const dialogsReducer = (state = initialState, action) => {/*передаем стейту его значение начальное!*/
  /*редьюсер для диалогов, возвращает измененный стейт*/

   

	switch(action.type){/*свич-условие по кейсу action.type*/
        case SEND_MESSAGE:/*если action.type === SEND_MESSAGE то*/
         let body = action.newMessageBody;/*записываем в body значение введенного сообщения*/
         return {
         ...state,
         messages : [...state.messages, {id:4, message: body}]/*а тут нам нужна так же копия сооьщений так как мы их тут добавляем*/
         };/*вместо push мы просто пишем через запятую то что мы добавляем в конец*/
        
	    default:/*длля свича по дефолту обязателньо значение - ретурним стейт так как он может быть возвращен и неизмененным*/
    return state;
}
}

export const sendMessageCreator = (newMessageBody) =>({type:SEND_MESSAGE, newMessageBody})/*экшнкриэйтор для отправки сообщения*/


export default dialogsReducer;

