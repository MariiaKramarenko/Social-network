import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {

return (
   <div>
   <ProfileInfo 
   savePhoto={props.savePhoto}
   isOwner={props.isOwner}
   profile={props.profile}
   status={props.status} 
   updateStatus={props.updateStatus}
   saveProfile={props.saveProfile} />
   
   <MyPostsContainer />
   </div>
	)
}

export default Profile;