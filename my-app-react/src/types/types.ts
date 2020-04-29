export type PostType={//тип для постов в стейте
    id: number
    message: string
    likesCount: number
}
export type ContactsType={//типизация контактов в профиле
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string


}
export type PhotosType={//типизация для фото профиля
    small: string | null
    large: string | null
}
export type ProfileType={//тип для profile в стейте что именно типизировать -смотрим в APIшке
    userId: number
    lookingForAJob: string
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType

}

export type UserType ={//смотрим в API что сидит в данном объекте
    id: number
    name: string
    status: string
    photos: PhotosType
    followed:boolean
}

