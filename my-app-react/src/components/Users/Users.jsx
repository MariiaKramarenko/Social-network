import React from 'react';
import userPhoto from '../../../src/assets/images/User.png';
import {NavLink} from 'react-router-dom';
import * as axios from 'axios';
import {usersAPI} from '../../api/api.js';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return <div>
        
        <div>
             {
                users.map(u => <User user={u}
                                     followingInProgress={props.followingInProgress}
                                     key={u.id}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                    />
                )
            }
        </div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
            </div>
}
export default Users;
