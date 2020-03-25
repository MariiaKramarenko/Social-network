import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../.././common/Preloader/Preloader.jsx'; 
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from "../../../assets/images/User.png";

///Contacts:{Object.keys(profile.contacts)} -итерируемся по объекту-в метод keys засунули объект,ключи которого нужно получить
//Object.keys пробегается по объекту и названия свойств объекта обернет в массив строк, которые мы отобразим потом через пропсы
const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto }) => {

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {//обработчик события на загрузку аватарки для прфиля
        if (e.target.files.length) {//если из тргета инпута вытягиваем файл и его длина присутствует то 
            savePhoto(e.target.files[0]);//вызываем коллбек и передааем во внешний мир наш выбранный файл на компьютере
        }
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
                { isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

                <div>
                <div>
                <ProfileData profile={profile}/>

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div></div>
        </div>
)
}


const Contact = ({contactTitle, contactValue}) =>{
    return <div>{contactTitle} : {contactValue}</div>
}

const ProfileData=({profile})=>{
   return  <div>
                <div>
                <b>Full name:</b> {profile.fullName}
                </div>
                  <div>
                     <b>Looking for a job:</b>{profile.lookingForAJob ? "yes" : "no"}
                  </div>
                   {profile.lookingForAJob &&
                     <div>
                     <b>My skills:</b>{profile.lookingForAJobDescription}/
                     </div>
                    }
                  <div>
                     <b>About me:</b> {profile.aboutMe} 
                  </div>
                  <div>
                     <b>Contacts:</b> {Object.keys(profile.contacts).map(key=>{
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                     })}
                  </div>
                </div>
}


export default ProfileInfo;