const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';


let initialState = {
	users: [],
	pageSize: 5,
	totalUsersCount: 21,
	currentPage:1
}

const usersReducer = (state = initialState, action) => 
{
	switch (action.type){
		case FOLLOW : 
		   return {/*делаем копию стейта для наших с ним преобразований*/
		   	...state,
		   	 //users:[...state.users],/*записи идентичны с map()*/
		   	 users: state.users.map(u => {
		   	 	if (u.id === action.userID){/*если Id совпадает с экшеном то мы должны изменить наш объект (создать копию и изменить)*/
		   	 		return {...u, followed: true}/*делаем ккопию и меняем в ней нужное значение*/
		   	 	}
		   	 	return u;
		   	 })/*с помощью мапа создаем новый массив эл-тами которого будут все те же юсерсы*/
		   	  }


		case UNFOLLOW :  
              return {
		   	...state,
		   	 
		   	 users: state.users.map(u => {
		   	 	if (u.id === action.userID){
		   	 		return {...u, followed: false}
		   	 	}
		   	 	return u;
		   	 })
		   	  }



		case SET_USERS: /*устанавливаем пользователей*/
		return {...state, users: [...state.users, ...action.users] 
			/*берем старых пользователей и меняем их на новых тех,кот пришли из экшена -добавляем в конец*/
		}


        case SET_CURRENT_PAGE: 
          return {...state, currentPage: action.currentPage
          }



		default:
		return state;
	}
}


export const followActionCreator = (userID) => ( { type: FOLLOW, userID } )/*экшнкриейтор для добавления в друзья пользователя*/
/*userID нам нужен чобы знать,какого именно пользователя нам нужно добавить/удалить*/
export const unfollowActionCreator = (userID) => ( { type: UNFOLLOW, userID } )/*экшнкриейтор для удаления из друзей пользователя*/
export const setUsersActionCreator = (users) =>( {type: SET_USERS, users} )/*экшн установления юзеров*/
export const setCurrentPageActionCreator = (currentPage) => ( {type:SET_CURRENT_PAGE, currentPage } )/*экшн кот меняет странички*/



export default usersReducer;