import * as axios from 'axios';


const instance = axios.create({
      withCredentials:true,
      baseURL: 'https://social-network.samuraijs.com/api/1.0/',
      headers: {
      	"API-KEY":"5d534339-0d81-48d2-a3c3-0682e7f5a8bf"
      }

}); /*создаем один конкретный экземпляр аксиоса (инстанс)*/

export const usersAPI = {/*вспомогательный объект в кот мы вынесли наши запросы на сервер*/
       getUsers:(currentPage = 1, pageSize = 10) => {
              return (instance.get(`users?page=${currentPage}& count=${pageSize}`)).then(response => {
    		return response.data
    	});
    }
}

