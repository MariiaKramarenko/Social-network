import React, {FC} from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import {ProfileType} from "../../types/types";
////TYPES///////////////////////
type PropsType={
    savePhoto: ()=>void
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: () => void
    saveProfile: ()=>void

}



//////END OF TYPES//////////////
let Profile: FC<PropsType> = (props) => {

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