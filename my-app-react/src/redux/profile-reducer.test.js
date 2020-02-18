import Rect from 'react';
import profileReducer, {addPostActionCreator} from './profile-reducer.js';
//1.- пункт тестирования:готовим исходные данные(обозначили state и action)
it('new post should be added', ()=> {

let action = addPostActionCreator("Mariia Kramarenko is good junior developer :)");//сюда передаем тот текст кот принимает экшнкриетор в profile-reducer
let state = {
  posts:[
      {id:1, message:'Hi! How are you?', likesCount:'0'},
      {id:2, message:'Good day!', likesCount:'10'}
      ]
};
//2. - делаем действие
let newState = profileReducer(state,action);//сравниваем старый state и action с новым стейтом

//3. -expect of result (ждем результат теста)
expect(newState.posts.length).toBe(3); //ожидаем что добавится новый пост а значит длина массиву будет не 2 поста а 3
});