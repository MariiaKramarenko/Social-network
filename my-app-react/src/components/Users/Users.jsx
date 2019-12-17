import React from 'react';
import s from './users.module.css';
import userPhoto from '../../../src/assets/images/User.png';
import {NavLink} from 'react-router-dom';


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);/*округляем до большего числа */

    let pages =[];/*массив со страницами вывода пользователей*/
    for ( let i=1; i <= pagesCount; i++) {/*итерируемся по пейджкаунту и пушим каждый его результат в массив страниц с пользователями*/
    pages.push(i);
    }


    return <div>
          <div>
    		{pages.map(p=> {/*мапим-выводим результат массива страниц(выводим страницы цифрами)*/
    		return (
   				<span className={ props.currentPage === p  && s.selectedPage}  /*если текущая страница совпала с одной их тех что пришли в ассиве,то выделяемм ее жирным шрифтом*/
    				onClick={(e)=> {props.onPageChanged(p); } }>{p}</span> /*по клику будем делать переход одной на другую страницы*/
    				)
   			 })}
         </div>
  
  {props.users.map(u => <div key = {u.id} >
    <span>
      <div>
      <NavLink to={'/profile/' + u.id}>
        <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.photo}/>
      </NavLink>
      </div>
      <div>
        {u.followed
        ? <button onClick ={ ()=>{props.unfollow(u.id)} }>Unfollow</button>
        : <button onClick ={ ()=>{props.follow(u.id)} }>Follow</button>
        }
      </div>
    </span>
    
    <span>
      <span>
        <div>{u.name}</div>
        <div>{u.status}</div>
      </span>
      <span>
        <div>{"u.location.city"}</div>
        <div>{"u.location.country"}</div>
      </span>
    </span>
  </div>)
  }
</div>
}

export default Users;

