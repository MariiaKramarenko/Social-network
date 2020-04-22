import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";
//селекторы упрлщают последующие изменения данных то есть
//грубо говоря даные кот нужно менять нужно будет изеннить только в одном месте-в селеторе
//селектор-функция кот принимает стейт и возвращает чтото из него
//проблема селекторов-частые перевызовы так как mapStateToProps постоянно обновляется
//для этого на помощь приходит reselect - передаем зависимости на которые будет реагировать селектор если они поменялись и тогда перерисовываться
////
//state:AppStateType -типизация обозначение что наш state имеет тип глобального стейта :AppStateType


export const getUsersAll = (state:AppStateType) =>{/*примитивный селектор*/
	return state.usersPage.users;
}

/*селектор,созданный с помощью библиотеки reselect*/
export const getUsersSuperSelector = createSelector(getUsersAll,(users)=>{/*первый параметр-селектор,кот ипользуется чтобы получить users*/
    return users.filter(u => true);//то есть если users изменился тогда срабатывает фильтрация
})

export const getPageSize = (state:AppStateType) =>{
	return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state:AppStateType) =>{
	return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state:AppStateType) =>{
	return state.usersPage.currentPage;
}

export const getIsFetching = (state:AppStateType) =>{
	return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state:AppStateType) =>{
	return state.usersPage.followingInProgress;
}


