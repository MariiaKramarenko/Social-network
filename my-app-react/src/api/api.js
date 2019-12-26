import * as axios from 'axios';


const instance = axios.create({
      withCredentials:true,
      baseURL: 'https://social-network.samuraijs.com/api/1.0/',
      headers: {
      	"API-KEY":"0fcee833-a2f4-404d-9bc5-8e0dcb62bd57"
      }

}); /*создаем один конкретный экземпляр аксиоса (инстанс)*/

export const usersAPI = {/*вспомогательный объект в кот мы вынесли наши запросы на сервер*/
    getUsers(currentPage = 1, pageSize = 10) {
              return instance.get(`users?page=${currentPage}&count=${pageSize}`)
                 .then(response => {
    		          return response.data
                   }
                 );
    },follow(userId){
             return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },unfollow(userId){
              return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
    },
    getProfile(userId){
       return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
    }
}





/*,
      authUser(setAuthUserData){
        return instance.get(`https://social-network.samuraijs.com/api/1.0/auth/me`)
             .then(response=> {
               if(response.data.resultCode === 0 ){
               let {id,email,login} = response.data.data;
              this.props.setAuthUserData(id,email,login);
          }
        });
      }*/