export interface User{
    _id:string,
    name:string,
    userName:string,
    avatar:string,
    photo:[string],
    email:string,
    password:string,
    
}

 

export enum ActionsType{
    LOGIN_USER = "LOGIN_USER",
    REGISTER_USER = "REGISTER_USER",
    CURRENT_USER = "CURRENT_USER",
    ADD_PHOTO = 'ADD_PHOTO',
    GET_ALL_USERS="GET_ALL_USERS",
}

export interface AddedPhotoAction{
    type: typeof ActionsType.ADD_PHOTO,
}
export interface CurrentUserAction{
    type: typeof ActionsType.CURRENT_USER,
    payload:User
}

export interface LoginUserAction{
    type:typeof ActionsType.LOGIN_USER,
    
}

export interface RegisterUserAction{
    type: typeof ActionsType.REGISTER_USER
}

export type UserActionsType = LoginUserAction  | AddedPhotoAction  | RegisterUserAction | CurrentUserAction;