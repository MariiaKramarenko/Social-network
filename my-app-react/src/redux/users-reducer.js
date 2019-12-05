const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';

let initialState = {
	users: [
      {id:1, followed: false, fullName:'Olga A.', status: 'I`m a mom', location: {city:'Florence', contry:'Italy'} },
      {id:2, followed: true, fullName:'Mariia K.', status: 'I`m a daugther', location: {city:'Warsaw', contry:'Poland'} },
      {id:3, followed: false, fullName:'Dmitry G.', status: 'I`m a friend', location: {city:'Kyiv', contry:'Ukraine'} },
      {id:4, followed: true, fullName:'Viki B.', status: 'I`m a friend', location: {city:'Kyiv', contry:'Ukraine'} }
	]
}

const usersReducer = (state = initialState, action) =>{
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

		default:
		return state;
	}
}


export const followActionCreator = (userID) => ({ type: FOLLOW, userID })/*экшнкриейтор для добавления в друзья пользователя*/
/*userID нам нужен чобы знать,какого именно пользователя нам нужно добавить/удалить*/
export const unfollowActionCreator = (userID) => ({ type: UNFOLLOW, userID })/*экшнкриейтор для удаления из друзей пользователя*/





export default usersReducer;