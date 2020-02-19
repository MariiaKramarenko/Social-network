import {usersAPI} from '../api/api.js';
import {updateObjectArray} from '../utils/object-helper.js';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
	users: [],
	pageSize: 5,
	totalUsersCount: 0,
	currentPage:1,
	isFetching:true,
	followingInProgress: []
}

const usersReducer = (state = initialState, action) => 
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
        users:  updateObjectArray(state.users, action.userID, "id", {followed: false} )
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


export const followSuccess = (userID) => ( { type: FOLLOW, userID } )/*экшнкриейтор для добавления в друзья пользователя*/
/*userID нам нужен чобы знать,какого именно пользователя нам нужно добавить/удалить*/
export const unfollowSuccess = (userID) => ( { type: UNFOLLOW, userID } )/*экшнкриейтор для удаления из друзей пользователя*/
export const setUsers = (users) =>( {type: SET_USERS, users} )/*экшн установления юзеров*/
export const setCurrentPage = (currentPage) => ( {type:SET_CURRENT_PAGE, currentPage } )/*экшн кот меняет странички*/
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count:totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type:TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userID) => ({type:TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID})


export const getUsers = (currentPage,pageSize) => {/*санк креатор-возвращает санку*/
    return  async (dispatch) => {/*санка*/
        dispatch(toggleIsFetching(true));/*диспатчим вызов экшн криетора  доступный из замыкания*/
        dispatch(setCurrentPage(currentPage));
            let data = await usersAPI.getUsers(currentPage, pageSize);/*в response приходит ответ от сервера */
     	  dispatch(toggleIsFetching(false));/*закончился тогглинг -диспатчим вызов экшн криетор с переданным параметром*/
        dispatch(setUsers(data.items));/*диспатчим юзеров в стейт-берется из замыкания*/
        dispatch(setTotalUsersCount(data.totalCount));/*сетаем тотал каун юзер-из замыкания берем*/
/*data.items-это наши юзеры*/
}
}
/////////////////ОБЩАЯ ФУНКЦИЯ ДЛЯ FOLLOW/UNFOLLOW -избавляемся от дублирования//////////////////
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) =>{
  dispatch(toggleFollowingProgress(true, userId));
              let response = await apiMethod(userId);
               if(response.data.resultCode == 0){
               dispatch(actionCreator(userId));
               }
               dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId) => {/*санк креатор-возвращает санку*/
    return  async (dispatch) => {/*санка*/
      followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);  
}
}

export const unfollow = (userId) => {/*санк креатор-возвращает санку*/
/*дожидаться промис когда зарезолвится мы можем только в асинхронных функциях!*/
    return  async (dispatch) => {/*санка*/
      followUnfollowFlow(dispatch, userId,  usersAPI.unfollow.bind(usersAPI),unfollowSuccess); 
}
}





export default usersReducer;