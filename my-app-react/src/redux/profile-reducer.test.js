import Rect from 'react';
import profileReducer, {addPostActionCreator} from './profile-reducer.js';
import ReactDOM from "react-dom";
import App from "../App";
//вынесем общие данные во избежание дублирования
let state = {
  posts:[
      {id:1, message:'Hi! How are you?', likesCount:'0'},
      {id:2, message:'Good day!', likesCount:'10'}
      ]
};



///////////////////TEST №1////////////////////////
it('new post should be added', ()=> {
//1.- пункт тестирования:готовим исходные данные(обозначили state и action)
let action = addPostActionCreator("Mariia Kramarenko");//сюда передаем тот текст кот принимает экшнкриетор в profile-reducer

//2. - делаем действие
let newState = profileReducer(state, action);//сравниваем старый state и action с новым стейтом

//3. -expect of result (ждем результат теста)
expect(newState.posts.length).toBe(3); //ожидаем что добавится новый пост а значит длина массиву будет не 2 поста а 3
});

///////////////////TEST №2////////////////////////
it('new message should be successed', ()=> {
//1 .- пункт тестирования:готовим исходные данные(обозначили state и action)
let action = addPostActionCreator("Mariia Kramarenko");//сюда передаем тот текст кот принимает экшнкриетор в profile-reducer

//2. - делаем действие
let newState = profileReducer(state, action);//сравниваем старый state и action с новым стейтом

//3. -expect of result (ждем результат теста)
expect(newState.posts[2].message).toBe("Mariia Kramarenko"); //ожидаем правильный текст поста 2 потомучто массив начинает считать с 0
});

///////////////////TEST №3////////////////////////