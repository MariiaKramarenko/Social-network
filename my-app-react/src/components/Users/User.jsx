import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/User.png";
import {NavLink} from "react-router-dom";

let User = ({user, followingInProgress, unfollow, follow}) => {
return (
<div className={styles.user}>
  <span>
    <div>
      <NavLink to={'/profile/' + user.id}>
        <img className="card-img-top" src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto}/>
      </NavLink>
    </div>
    <div>
          <div className={styles.name}><strong>Name :</strong>{user.name}</div>
          <div className={styles.name}><strong>Status:</strong> {user.status}</div>
      {user.followed ? <button className="btn btn-outline-primary"  onClick={() => { unfollow(user.id) }}>Follow</button>
      : <button className={"btn btn-outline-primary"} disabled={followingInProgress.some(id => id === user.id)} onClick={() => { follow(user.id) }}>Unfollow</button>}
    </div>
  </span>
</div>)
}
export default User;