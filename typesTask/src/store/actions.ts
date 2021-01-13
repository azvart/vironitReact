import {Data,ADD_ITEM,DELETE_ITEM,UPDATE_ITEM,DataActionTypes} from './types';

export function AddItem(data:Data):DataActionTypes{
    return{
        type:ADD_ITEM,
        payload:{ data }
    }
}

export function DeleteItem(id:number):DataActionTypes{
    return{
        type:DELETE_ITEM,
        meta:{
            id
        }
    }
}

