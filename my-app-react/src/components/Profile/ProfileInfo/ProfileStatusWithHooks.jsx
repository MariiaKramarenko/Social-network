import React, {useState, useEffect} from 'react';



const  ProfileStatusWithHooks =(props)=> {/*создаем функцию Хук*/
/*КАК СКОНСТРУИРОВАН ЮЗ СТЕЙТ:

useStete-функция кот гворит сама за себя - "использовать стейт локальный" и возвращает массив из двух элементов
перве значение-стартовое значение стейта*/


/*let stateWithUseState = useState(false);/*использовать стейт стейт хуковский/ false-начальное значение*/
/*let editMode = stateWithUseState[0];/*возвратили первое значение стейта-false*/
/*let seteditMode = stateWithUseState[1];/*второе значение-функция кот будет менять первое значение*/
/*/////////////////
destruction
let arr = [0, () =>{}]; /*массив в кот первое знач - и второек-функция,кот его изменяет */
/*let [a, setA] = arr;/*/



/*деструктурирующее присваивание-
 в первый элемент массива засунем первый элемент из массива
  во второй-второй(в нашем случае useState-возвращает массив где первое его значение-
  это значение локального стейта по умолчанию,
  а второе-функция кот будет его менять)*/


/*применим это на нашем useState*/
let [editMode, setEditMode] = useState(false);/*объявляем юз стейт(помним,что это массив) с помощью деструктурирующего присваивания*/
let [status, setStatus] = useState(props.status);/*концепция хуков-делайте много локальных стейтов,
поэтому деаем такой же стейт для передачи статуса и в последствии его изменений с пом функции кот сидит как второй параметр*/


/*useEffect -синхронизация состояния компоненты*/
useEffect(()=>{
   setStatus(props.status);
}, [props.status]);/*принимает функцию кот отрисовывается когда компонента отрисуется 
[props.status] - то от чего зависит перерисовка useEffect
*/

const activateEditMode = () =>{/*функция,меняющая по клику дефолтное значение в массиве useState посредством вызова второго парметра-функции */
   setEditMode(true);/*меняем значение с пом вызова функции*/
}


const deactivateEditMode = () =>{/*функция,меняющая по клику значение editMode на false посредством вызова 
  второго парметра массива useState -функции кот будет менять первое значение*/
   setEditMode(false);/*меняем значение с пом вызова функции*/
   props.updateStatus(status);/*отправляем на сервер настоящее значение статуса кот было введено в инпуте*/
}

const onStatusChange = (e) =>{/*устанавливаем значение статуса по клику на input и его изменение - с пом функции второго парметра*/
       setStatus(e.currentTarget.value); /*берем значение из нативного html*/
}


return(
<div>
  {!editMode && /*если значение false &&-тогда выполняет логику с пом. аттрибута onDoubleClick вызываем метод класса*/
  <div>
    <b>Status:</b><span onDoubleClick={activateEditMode}> {props.status || "no status"}</span>
  </div>
  }
  {editMode && /*если значение true &&-тогда выполняем логику посредством аттрибута onBlur- при фокусе срабатывает метод класса*/
  <div>
    <input onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus={true} value={status}/>
  </div>
  }
</div>
)
}
export default ProfileStatusWithHooks;