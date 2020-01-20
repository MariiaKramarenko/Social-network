import {createSelector} from "reselect";

export const getUsersAll = (state) =>{/*примитивный селектор*/
	return state.usersPage.users;
}

/*селектор,созданный с помощью библиотеки reselect*/
export const getUsersSuperSelector = createSelector(getUsersAll,(users)=>{/*первый параметр-селектор,кот ипользуется чтобы получить users*/
    return users.filter(u => true);
})

export const getPageSize = (state) =>{
	return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) =>{
	return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) =>{
	return state.usersPage.currentPage;
}

export const getIsFetching = (state) =>{
	return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) =>{
	return state.usersPage.followingInProgress;
}


