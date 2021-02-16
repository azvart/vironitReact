import {ActionCreator,Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {User,CurrentUserAction,ActionsType} from '../types';
import useHandleResponse from '../../utils/useHandleResponse';
import authHeader from '../../utils/authHeader';

const CurrentAction:ActionCreator<ThunkAction<Promise<any>,User,null,CurrentUserAction>>=()=>{
    const handleResponse = useHandleResponse();

    return async (dispatch:Dispatch)=>{
        try{
            const requestOptions:any={
                method:'GET',
                headers:authHeader(),
            };

            fetch('http://localhost:5000/user',requestOptions)
            .then(handleResponse)
            .then(user=>{
                dispatch({
                    type:ActionsType.CURRENT_USER,
                    payload:user
                })
            })
            .catch((e)=>{
                console.error(e);
            })
            

        }catch(err){
            console.log(err);
        }
    }
}




export default CurrentAction;