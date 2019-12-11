import React from 'react';
import s from './users.module.css';
import * as axios from 'axios';
import userPhoto from '../../../src/assets/images/User.png';

class Users extends React.Component {

  /*constructor (props) {
     super(props);} конструктор главной компоненты происходит по умолчанию*/

    componentDidMount() {
       axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}& count=${this.props.pageSize}`).then(response=> {/*в response приходит ответ от сервера */
      this.props.setUsers(response.data.items)/*смотри через дебаг что приходит в респонс и оотуда вытягиваем-а теперь мы их берем этих юзеров с сервера и сетаем(вставляем) в наш стейт!!*/
    });/*data.items-это наши юзеры*/
    
    }



    onPageChanged = (pageNumber)=> {
      this.props.setCurrentPage(pageNumber);
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}& count=${this.props.pageSize}`).then(response=> {/*в response приходит ответ от сервера */
      this.props.setUsers(response.data.items)});
    }




     render () {
       let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

       let pages =[];
       for ( let i=1; i <= pagesCount; i++) {
        pages.push(i);
       }


        return  <div>
        <div>
        {pages.map(p=> {
          return (
          <span className={ this.props.currentPage === p  && s.selectedPage}  
          onClick={(e)=> { this.onPageChanged(p); } }>{p}</span> 
          )
        })}

        </div>
     
      {
        this.props.users.map(u => <div key = {u.id} > 
             <span>
              <div>
                <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.photo}/>
              </div>
              <div>
                {u.followed 
                  ? <button onClick ={ ()=>{this.props.unfollow(u.id)} }>Unfollow</button> 
                  : <button onClick ={ ()=>{this.props.follow(u.id)} }>Follow</button>
                }
              </div>
             </span>
             
             <span>
                <span>
                <div>{u.name}</div> 
                <div>{u.status}</div>
                </span>

                <span>
                <div>{"u.location.city"}</div>
                <div>{"u.location.country"}</div>
                </span>
             </span>



          </div>)
      }
      </div>
     }
}

export default Users;