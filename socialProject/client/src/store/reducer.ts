
import {User,UserActionsType,ActionsType} from './types';



const initialState:User={
    _id:'',
    name:'',
    userName:'',
    avatar:'',
    photo:[''],
    email:'',
    password:'',
    
}



const UserReducer = (state=initialState,action:UserActionsType)=>{
    switch(action.type){
        case ActionsType.LOGIN_USER:
            return state;
        case ActionsType.REGISTER_USER:
            return state;
        case ActionsType.CURRENT_USER:
            return {...state,...action.payload}

        default:
            return state;
    }
}


export default UserReducer;