import React from 'react';
import s from './users.module.css';
import userPhoto from '../../../src/assets/images/User.png';
import {NavLink} from 'react-router-dom';
import * as axios from 'axios';

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
    <div>{u.followed ? <button disabled={props.followingInProgress} onClick ={ () => {
     
      props.toggleFollowingProgress(true);
              axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
              withCredentials:true,
              headers: {
              "API-KEY":"5d534339-0d81-48d2-a3c3-0682e7f5a8bf"
            }
            }).then(response =>{
               debugger;
               if(response.data.resultCode == 0){
                props.unfollow(u.id);
               }
               props.toggleFollowingProgress(false);
            });}}>UNFOLLOW </button>

        : <button disabled={props.followingInProgress} onClick ={ () => {
          props.toggleFollowingProgress(true);
              axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{
              withCredentials:true,
              headers: {
              "API-KEY":"5d534339-0d81-48d2-a3c3-0682e7f5a8bf"
            }
            }).then(response =>{
               if(response.data.resultCode == 0){
               props.follow(u.id);
               }
               props.toggleFollowingProgress(false);
             });}}>FOLLOW</button>
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

