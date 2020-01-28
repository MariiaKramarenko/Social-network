import React, {PureComponent} from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from 'redux-form';
import {required, maxLengthCreator} from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControls';


const maxLength10 = maxLengthCreator(10);/*криетор проверки формы на длину символов*/

const AddNewPostForm = (props) =>{/*выносим форму в отдельную компоненту*/
 return (
         <form onSubmit={props.handleSubmit}>
            <div>
              <Field validate={[required, maxLength10]} placeholder={"Send your post"} name={"newPostText"} component={Textarea}/>
            </div>
            <div>
              <button className={s.addpost}>Add post</button>
            </div>
          </form>
          )
}
/*форма созданная с помощью редакс форм-то есь обернутая в хук редаксФорм*/
const AddNewPostFormRedux = reduxForm({form:"ProfileAddNewPostForm"}) (AddNewPostForm);/*оборачиваем форму в хок редакс формы*/


class MyPosts extends PureComponent {/*классовая PureComponent- содержит в себе метод shoukdComponentUpdate, 
то есть компонента не требует прописывания этого метода (компонента должна обновиться? сравнение следующих пропсов и стейта снастоящими)компонента майпост
shouldComponentUpdate(nextProps, nextState){
   return nextProps != this.props || nextState != this.state;
}

*/

render(){
  console.log("RENDER YO");

let postsElements = /*орисовываем (мапим) посты путем преобразования массива posts в jsx элемент*/
    this.props.posts.map( p =>
      <Post message={p.message} likesCount={p.likesCount}/>
      );


let onAddPost = (values) => {/*функция добавления поста на стену*/
   this.props.addPost(values.newPostText);/*вызываем коллбек который задиспатчит значение нового поста пришедшее из onSubmit*/
   
 }

  return(
    <div className={s.postsBlock}>

         <div  className={s.myposts}>
              My posts
         </div>
        <AddNewPostFormRedux onSubmit={onAddPost}/>          
          {postsElements}
      </div>
  	)

}
}

export default MyPosts;