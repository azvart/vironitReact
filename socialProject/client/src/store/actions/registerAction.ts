import {ActionCreator,Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {User,RegisterUserAction,ActionsType} from '../types';
import useHandleResponse from '../../utils/useHandleResponse';
import {CurrentUserSubject} from '../../service/authService';



const RegisterAction:ActionCreator<ThunkAction<Promise<any>,User,null,RegisterUserAction>> =(name:string,email:string,password:string,userName:string)=>{
    const handleResponse:any = useHandleResponse();
    return async (dispatch:Dispatch)=>{
       try{
        const requestOptions:any={
            method:'POST',
            headers:{
                'Content-Type':"application/json"
                
            },
            body:JSON.stringify({name,email,password,userName})
        }

         fetch('http://localhost:5000/register',requestOptions)
        .then(handleResponse)
        .then(user=>{
            localStorage.setItem('currentUser',JSON.stringify(user));
            CurrentUserSubject.next(user);
            return user;
        }).catch(response=>{
            if(response){
                console.log("Error");
            }else{
                console.log("Failed to Register");
            }
        })
        dispatch({
            type:ActionsType.REGISTER_USER
        })
       }catch(err){
        console.error(err);
       }

    }
}



export default RegisterAction;