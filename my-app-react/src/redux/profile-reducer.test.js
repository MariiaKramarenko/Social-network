import Rect from 'react';
import profileReducer, {addPostActionCreator, deletePost} from './profile-reducer.js';
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

///////////////////TDD-TEST №3 ////////////////////////
it('after deleting length of messages should be decrement', () => {
    // 1. 
    let action = deletePost(1);//удалить пост с id =1

    // 2. 
    let newState = profileReducer(state, action);

    // 3. 
    expect(newState.posts.length).toBe(1);
});

///////////////////TDD-TEST №4 ////////////////////////
it(`after deleting length shouldn't be incorrect if is unsuccesfull`, () => {
    // 1.
    let action = deletePost(1000);

    // 2. 
    let newState = profileReducer(state, action);

    // 3. 
    expect(newState.posts.length).toBe(2);
});