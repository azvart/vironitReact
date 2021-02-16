import {ActionCreator,Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {User,LoginUserAction,ActionsType} from '../types';
import useHandleResponse from '../../utils/useHandleResponse';
import {CurrentUserSubject} from '../../service/authService';

const LoginAction:ActionCreator<ThunkAction<Promise<any>,User,null,LoginUserAction>>=(email:string,password:string)=>{
    const handleResponse = useHandleResponse();
    return async (dispatch:Dispatch)=>{
        try{

            const requestOptions:any={
                method:'POST',
                headers:{
                    'Content-Type':"application/json",
                },
                body:JSON.stringify({email,password})
            }

            fetch('http://localhost:5000/login',requestOptions)
            .then(handleResponse)
            .then(user=>{
                localStorage.setItem('currentUser',JSON.stringify(user));
                CurrentUserSubject.next(user);
                console.log(user);
                return user;
            }).catch(()=>{
                console.log("Error");
            })
            dispatch({
                type:ActionsType.LOGIN_USER,
            })
           


        }catch(err){
            console.error(err);
        }
    }
}

export default LoginAction;