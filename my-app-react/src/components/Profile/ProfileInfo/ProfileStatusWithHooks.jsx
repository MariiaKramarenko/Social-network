import React, {useState} from 'react';



const  ProfileStatusWithHooks =(props)=> {/*создаем функцию Хук*/
/*КАК СКОНСТРУИРОВАН ЮЗ СТЕЙТ:

юз стейт возвращает массив из двух элементов
перве значение-стартовое значение стейта*/
/*let stateWithUseState = useState(false);/*использовать стейт стейт хуковский/ false-начальное значение*/
/*let editMode = stateWithUseState[0];/*возвратили первое значение стейта-false*/
/*let seteditMode = stateWithUseState[1];/*второе значение-функция кот будет менять первое значение*/
/*/////////////////
destruction
let arr = [0, () =>{}]; /*массив в кот первое знач - и второек-функция,кот его изменяет */
/*let [a, setA] = arr;/*/

let [editMode, setEditMode] = useState(false);/*объявляем юз стейт(помним,что это массив) с помощью деструктурирующего присваивания*/

const activateEditMode = () =>{/*функция,меняющая по клику дефолтное значение в массиве useState посредством вызова второго парметра-функции */
   setEditMode(true);/*меняем значение с пом вызова функции*/
}


return(
<div>
  {!editMode && /*если значение false &&-тогда выполняет логику с пом. аттрибута onDoubleClick вызываем метод класса*/
  <div>
    <span onDoubleClick={activateEditMode}> {props.status || "no status"}</span>
  </div>
  }
  {editMode && /*если значение true &&-тогда выполняем логику посредством аттрибута onBlur- при фокусе срабатывает метод класса*/
  <div>
    <input autoFocus={true}  />
  </div>
  }
</div>
)
}
export default ProfileStatusWithHooks;