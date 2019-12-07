import React from 'react';
import s from './users.module.css';
import * as axios from 'axios';
import userPhoto from '../../../src/assets/images/User.png';

let Users = (props) => {
  let getUsers = () => {
   if (props.users.length === 0) {

    axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response=> {/*в response приходит ответ от сервера */
      props.setUsers(response.data.items)/*смотри через дебаг что приходит в респонс и оотуда вытягиваем-а теперь мы их берем этих юзеров с сервера и сетаем(вставляем) в наш стейт!!*/
    });/*data.items-это наши юзеры*/}
  }

	return  <div>
     <button onClick={getUsers}> Get users </button>
      {
      	props.users.map(u => <div key = {u.id} > 
             <span>
             	<div>
             		<img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.photo}/>
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