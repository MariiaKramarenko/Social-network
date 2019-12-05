import React from 'react';
import s from './users.module.css';

let Users = (props) => {
	return (

      <div>
      {
      	props.users.map(u => <div key = {u.id} > 
             <span>
             	<div>
             		<img src={u.photoUrl} className={s.photo}/>
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
                <div>{u.fullName}</div> 
                <div>{u.status}</div>
                </span>

                <span>
                <div>{u.location.city}</div>
                <div>{u.location.country}</div>
                </span>
             </span>



      		</div>)
      }
      </div>)
		
}

export default Users;