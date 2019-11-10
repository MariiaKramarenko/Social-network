import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';


const Profile = () => {
   
return (
   <div>
   <div> 
    <img src ="https://res.cloudinary.com/hzekpb1cg/image/upload/c_fill,h_410,w_800,f_auto/s3/public/prod/s3fs-public/Italy_Firenze.jpg" />
   </div>
   <div>ava+ description </div>

   <MyPosts />
   </div>
	)
}

export default Profile;