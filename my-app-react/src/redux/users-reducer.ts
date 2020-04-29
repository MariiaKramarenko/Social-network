import {usersAPI} from '../api/api';
import {updateObjectArray} from '../utils/object-helper';
import {PhotosType, UserType} from "../types/types";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";



const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
/////TYPES////////////////////////////////////
export  type InitialStateType= typeof initialState;//типизация для стейта

type FollowSuccessActionType={
    type:typeof FOLLOW
    userID:number
}

type UnfollowSuccessActionType={
    type:typeof UNFOLLOW
    userID:number
}
type SetUsersActionType={
    type:typeof SET_USERS
    users: Array<UserType>
}

type SetCurrentPageActionType={
    type:typeof SET_CURRENT_PAGE
    currentPage:number
}

type SetTotalUsersCountActionType={
     type:typeof SET_TOTAL_USERS_COUNT
     count: number
}

type ToggleIsFetchingActionType ={
    type:typeof TOGGLE_IS_FETCHING
    isFetching:boolean
}

type ToggleFollowingProgressActionType={
    type:typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching:boolean
    userID:number
}

type ActionTypes= FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType |
    SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType;//common type for all actions in this reducer

//типизация для санки,взяли из документации
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
type DispatchType = Dispatch<ActionTypes>;

//////END OF TYPES////////////////////////////
let initialState = {
	users: []as Array<UserType>,//типизация массива users
	pageSize: 5,
	totalUsersCount: 0,
	currentPage:1,
	isFetching:true,
	followingInProgress: [] as Array<number> //тип-массив в котором сидят id юзеров.
}

const usersReducer = (state = initialState, action:ActionTypes):InitialStateType =>
{
	switch (action.type){
		case FOLLOW : 
		   return {/*делаем копию стейта для наших с ним преобразований*/
		   	...state,
        users: updateObjectArray(state.users, action.userID, "id", {followed: true} )
        //users: state.users.map(u => {//users:[...state.users],/*записи идентичны с map()*/
		   	 	//if (u.id === action.userID){/*если Id совпадает с экшеном то мы должны изменить наш объект (создать копию и изменить)*/
		   	 	//	return {...u, followed: true}/*делаем ккопию и меняем в ней нужное значение*/
		   	 //	}
		   	 //	return u;
		   	// })/*с помощью мапа создаем новый массив эл-тами которого будут все те же юсерсы*/

		   	  }


		case UNFOLLOW :  
              return {
		   	...state,
        users:  updateObjectArray(state.users, action.userID, "id", {followed:false} )
        // users: state.users.map(u => {
		   	 //	if (u.id === action.userID){
		   	 //		return {...u, followed: false}
		   	 	//}
		   	 	//return u;
		   	// })
		   	  }

		case SET_USERS: /*устанавливаем пользователей*/
		return {...state, users: action.users 
			/*берем старых пользователей и меняем их на новых тех,кот пришли из экшена -добавляем в конец*/
		}

        case SET_CURRENT_PAGE: 
          return {...state, currentPage: action.currentPage
          }

        case SET_TOTAL_USERS_COUNT:
        return {...state, totalUsersCount:action.count
        }

        case TOGGLE_IS_FETCHING:
        return{
            ...state, isFetching:action.isFetching
        }
        
        case TOGGLE_IS_FOLLOWING_PROGRESS:
        return {
            ...state,
            followingInProgress: action.isFetching 
            ? [...state.followingInProgress, action.userID]
            : state.followingInProgress.filter(id => id != action.userID)
        }

		default:
		return state;
	}
}


export const followSuccess = (userID:number):FollowSuccessActionType => ( { type: FOLLOW, userID } )/*экшнкриейтор для добавления в друзья пользователя*/
/*userID нам нужен чобы знать,какого именно пользователя нам нужно добавить/удалить*/
export const unfollowSuccess = (userID:number):UnfollowSuccessActionType => ( { type: UNFOLLOW, userID } )/*экшнкриейтор для удаления из друзей пользователя*/
export const setUsers = (users: Array<UserType>):SetUsersActionType =>( {type: SET_USERS, users} )/*экшн установления юзеров*/
export const setCurrentPage = (currentPage:number):SetCurrentPageActionType => ( {type:SET_CURRENT_PAGE, currentPage } )/*экшн кот меняет странички*/
export const setTotalUsersCount = (totalUsersCount:number):SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT, count:totalUsersCount})
export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingActionType => ({type:TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching:boolean, userID:number):ToggleFollowingProgressActionType => ({type:TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID})


export const getUsers = (currentPage:number,pageSize:number):ThunkType => {/*санк креатор-возвращает санку*/
    return  async (dispatch, getState) => {/*санка*/
        dispatch(toggleIsFetching(true));/*диспатчим вызов экшн криетора  доступный из замыкания*/
        dispatch(setCurrentPage(currentPage));
            let data = await usersAPI.getUsers(currentPage, pageSize);/*в response приходит ответ от сервера */
        dispatch(toggleIsFetching(false));/*закончился тогглинг -диспатчим вызов экшн криетор с переданным параметром*/
        dispatch(setUsers(data.items));/*диспатчим юзеров в стейт-берется из замыкания*/
        dispatch(setTotalUsersCount(data.totalCount));/*сетаем тотал каун юзер-из замыкания берем*/
/*data.items-it is our users*/
}
}

/////////////////ОБЩАЯ ФУНКЦИЯ ДЛЯ FOLLOW/UNFOLLOW -избавляемся от дублирования//////////////////
const followUnfollowFlow = async (dispatch:DispatchType, userId:number, apiMethod:any, actionCreator:(userId:number)=> FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleFollowingProgress(false, userId));
    let response = await apiMethod(userId);

    if (response.data.resultCode == 0) {
        dispatch(actionCreator(userId));
    }else
    dispatch(toggleFollowingProgress(true, userId));
}

//thunk-creator for following user
export const follow = (userID:number):ThunkType => {/*thunk-creator return thunk*/
    return  async (dispatch) => {/*thunk*/
      followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), followSuccess);  
}
}

//thunk-creator for unfollowing user
export const unfollow = (userID:number):ThunkType => {/*thunk-creator return thunk*/
/*дожидаться промис когда зарезолвится мы можем только в асинхронных функциях!*/
    return  async (dispatch) => {/*thunk*/
      followUnfollowFlow(dispatch, userID,  usersAPI.unfollow.bind(usersAPI),unfollowSuccess); 
}
}





export default usersReducer;