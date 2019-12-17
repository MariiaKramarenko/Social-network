import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../.././common/Preloader/Preloader.jsx'; 



const ProfileInfo = (props) => {

   if (!props.profile) {
      return <Preloader/>
   } 
	return (
         <div className={s.postsBlock}>
   			<div className={s.profileimg}>
      		<img src="https://cdn.getyourguide.com/img/tour_img-2365930-148.jpg" />
   			</div>
   			<div className={s.descriptionBlock}>

            <img src={props.profile.photos.large} />
            
   			ava+description
   			</div>
         </div>         
		)
}

export default ProfileInfo;