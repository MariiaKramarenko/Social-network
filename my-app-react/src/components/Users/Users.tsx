import React, {FC} from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import {UserType} from "../../types/types";
/////TYPES//////////////////////////
type PropsTypes={
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber:number)=> void
    followingInProgress: Array<number>
    unfollow: (userId:number)=> void
    follow: (userId:number)=> void
    users: Array<UserType>
}


//чтобы не писать React.Fc мы заимпортировали FC и теперь можно писать короче
////END OF TYPES///////////////////
let Users: FC<PropsTypes> = ({currentPage,totalUsersCount,pageSize,onPageChanged,followingInProgress,unfollow,follow, users,...props}) => {
    return <div>
        <div>{users.map(u => <User user={u} followingInProgress={followingInProgress} key={u.id}
                                     unfollow={unfollow} follow={follow}/>
                )}
        </div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        </div>
}
export default Users;
