const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {/*инициализируемый стейт-то есть тот что передается при входе*/
    posts:[
      {id:1, message:'Hi! How are you?', likesCount:'0'},
      {id:2, message:'Good day!', likesCount:'10'}
      ],
    newPostText:'mariia kramarenko'
};



const profileReducer = (state = initialState , action) =>{/*передаем стейту его значение начальное!*/
  /*редьюсер для страницы профайл-он возвращает измененный стейт */
	switch(action.type){/*исп. свич вмето if else - ставим по какому кейсу будем свитчить*/
     case ADD_POST:/*если action.type === ADD_POST то */
         let newPost = {/*формируем новый пост*/
          id:5,
          message: state.newPostText,/*засовываем сюда значение нового поста введенное нами*/
          likesCount: 0
    };
      let stateCopy = {...state};/*создаем копию объекта */
      stateCopy.posts = [...state.posts];/*делаем копию массива постов */
      stateCopy.posts.push(newPost);/*пушим в копию объекта новый пост */     
      stateCopy.newPostText = ' ';/*зануляем строку ввода после добавления поста в копии объекта*/
      return stateCopy;/*ретурним стейт копию так как кейсы "проваливаются" и им нужна как бы точка-закрепление (почитать про switch)*/
   
   case UPDATE_NEW_POST_TEXT:{/*если action.type === UPDATE_NEW_POST_TEXT то записываем в значение нового поста введенный текст пользователм*/
          let stateCopy = {...state};/*создаем копию объекта */
          stateCopy.newPostText = action.newText;  /*образаемся к новому посту в копии и записываем из экшена*/      
          return stateCopy;/*ретурним стейт копию чтобы не "проваливался" кейс*/
          }
          default:/*обязательное значение по дефолту для switch*/
          return state;
}
}

export const addPostActionCreator = () => ({type: ADD_POST})/*экшнкриейтор кот возвращает тип экшена ADD_POST*/

export const updateNewPostTextActionCreator = (text) =>/*экшнкриейтор принимающий в агрумент текст вводимый пользователм*/
({type: UPDATE_NEW_POST_TEXT, newText:text})/*принимает значение экшн тип UPDATE_NEW_POST_TEXT и записывает текст как новый текст поста*/


export default profileReducer;