import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
	return (
         <div className={s.postsBlock}>
   			<div className={s.profileimg}>
      		<img src="https://cdn.getyourguide.com/img/tour_img-2365930-148.jpg" />
   			</div>
   			<div className={s.descriptionBlock}>
   			ava+description
   			</div>
         </div>         
		)
}

export default ProfileInfo;