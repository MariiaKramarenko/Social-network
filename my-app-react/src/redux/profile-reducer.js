const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';



const profileReducer = (state, action) =>{
	if 
    (action.type === ADD_POST){
      let newPost = {/*обычная переменная внутри метода */
      id:5,
      message: state.newPostText,/*спрашиваем у стейта значение введенное нами*/
      likesCount: 0
    };/*сюда это запихивается как соообщение для newPost */

   state.posts.push(newPost);/* затем, полученный нами newPost  мы пушим в конец массива с постами*/
   state.newPostText = ' ';/*занулим строку*/
   
  }
   else if (action.type === UPDATE_NEW_POST_TEXT){
          state.newPostText = action.newText;/*ут text становится newText и записывается в state*/         
  } 
  return state;
}

export default profileReducer;