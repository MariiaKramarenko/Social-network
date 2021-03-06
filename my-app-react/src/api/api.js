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
             return instance.post(`follow/${userId}`)
    },unfollow(userId){
             return instance.delete(`follow/${userId}`)
    },
    getProfile(userId){/*сохраняем беэкворккомпатибилити- то есть те запросы кот. были они не сломаются*/
             return profileAPI.getProfile(userId);/*переделегирование*/
    }
}


export const profileAPI = {
    getProfile(userId){
             return instance.get(`profile/` + userId);
    },
    getStatus(userId){/*получаем статую юзера узнаем какого-с помощью айди юзера*/
             return instance.get(`profile/status/` + userId);
    },
    updateStatus(status){/*как называется параметр в объекте:смотреть апишку в нашем случае status:status*/
             return instance.put(`profile/status/`, {status:status});
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
//второй параметр-formData объек ко содержит форму данных передавааемых на сервер,3й парам- специфические заголовки именно дя этого запроса
    },
    saveProfile(profile){//отправляем на сервер данные о профиле пользователя с его информацией в виде уже объекта(такой же какой приходит нам от сервера)
       return instance.put(`profile`, profile);//put-отправляет на сервер  объект профиля
    }
}


export const authAPI ={/*объект в апишке отвечающий за запросы для логинизации в соцсети*/
     me(){
            return instance.get(`auth/me`);
    },
     login(email, password, rememberMe = false, captcha = null){/*вместе с post запросом мы отправляем на сервак данные вторым парамером как объект(для put и post мы передаем объект данных)*/
            return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },
     logout(){/*вылогиниваемся*/
            return instance.delete(`auth/login`);/*delete запрос удалит на сервере данные логинизации*/
    }

}

export const securityAPI={
    getCaptchaUrl(){
        return instance.get(`security/get-captcha-url`);
    }
}

