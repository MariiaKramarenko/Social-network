import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../.././common/Preloader/Preloader.jsx'; 
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from "../../../assets/images/User.png";


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
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
)
}
export default ProfileInfo;