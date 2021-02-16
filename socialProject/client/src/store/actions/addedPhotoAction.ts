import {ActionCreator,Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {User,AddedPhotoAction,ActionsType} from '../types';


const AddedPhotoUser:ActionCreator<ThunkAction<Promise<any>,User,null,AddedPhotoAction>> =(id,token,photo)=>{
    

    return async (dispatch:Dispatch)=>{
        if(photo){
            try{

                const formData = new FormData();
                formData.append('photos',photo);
                const requestOptions:any={
                    method:'POST',
                    headers:{
                        Authorization:`${token}`
                    },
                    body:formData

                    
                }
                fetch(`http://localhost:5000/photos/${id}`,requestOptions);
                dispatch({
                    type:ActionsType.ADD_PHOTO,
                })

            }catch(err){
                console.log(err);
            }
        }
    }
}

export default AddedPhotoUser;