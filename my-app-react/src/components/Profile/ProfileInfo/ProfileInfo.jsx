import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../.././common/Preloader/Preloader.jsx'; 
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from "../../../assets/images/User.png";
import ProfileForm from "./ProfileForm.jsx";

///Contacts:{Object.keys(profile.contacts)} -итерируемся по объекту-в метод keys засунули объект,ключи которого нужно получить
//Object.keys пробегается по объекту и названия свойств объекта обернет в массив строк, которые мы отобразим потом через пропсы
const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
   
   let [editMode, setEditMode] = useState(false);//юзаем хук useState для определения начение редактирования

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {//обработчик события на загрузку аватарки для прфиля
        if (e.target.files.length) {//если из тргета инпута вытягиваем файл и его длина присутствует то 
            savePhoto(e.target.files[0]);//вызываем коллбек и передааем во внешний мир наш выбранный файл на компьютере
        }
    }
    const onSubmit = (formData) => {
       saveProfile(formData);//вызываем коллбек который сохраняет на сервере даннные введенные в форму
       setEditMode(false);//выходим из режима редактирования
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
                { isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

                <div>
                <div>
                {editMode 
                ? <ProfileForm initialValues={profile} profile={profile} onSubmit={onSubmit} /> 
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={ () => {setEditMode(true)} } />}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div></div>
        </div>
)
}


const Contact = ({contactTitle, contactValue}) =>{
    return <div>{contactTitle} : {contactValue}</div>
}

const ProfileData=({profile, isOwner, goToEditMode})=>{// даннst юзера если мы в статусе редактирования то высветится форма для изменения данных 
   return  <div>
               {isOwner && <div><button onClick={goToEditMode} > Edit my information </button></div>}
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