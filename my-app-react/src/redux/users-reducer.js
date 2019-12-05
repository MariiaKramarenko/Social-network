const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';



let initialState = {
	users: [
      {id:1, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Dmitry_Nagiev_2017_4.jpg', followed: false, fullName:'Olga A.', status: 'I`m a mom', location: {city:'Florence', contry:'Italy'} },
      {id:2, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Dmitry_Nagiev_2017_4.jpg', followed: true, fullName:'Mariia K.', status: 'I`m a daugther', location: {city:'Warsaw', contry:'Poland'} },
      {id:3, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Dmitry_Nagiev_2017_4.jpg', followed: false, fullName:'Dmitry G.', status: 'I`m a friend', location: {city:'Kyiv', contry:'Ukraine'} },
      {id:4, photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Dmitry_Nagiev_2017_4.jpg', followed: true, fullName:'Viki B.', status: 'I`m a friend', location: {city:'Kyiv', contry:'Ukraine'} }
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

		case SET_USERS: /*устанавливаем пользователей*/
		return{
			...state,/*берем старый стейт делаем копию*/
			users: [...state, ...action.users] 
			/*берем старых пользователей и меняем их на новых тех,кот пришли из экшена -добавляем в конец*/
		}

		default:
		return state;
	}
}


export const followActionCreator = (userID) => ( { type: FOLLOW, userID } )/*экшнкриейтор для добавления в друзья пользователя*/
/*userID нам нужен чобы знать,какого именно пользователя нам нужно добавить/удалить*/
export const unfollowActionCreator = (userID) => ( { type: UNFOLLOW, userID } )/*экшнкриейтор для удаления из друзей пользователя*/
export const setUsersActionCreator = (users) =>( {type: SET_USERS, users} )/*экшн установления юзеров*/




export default usersReducer;