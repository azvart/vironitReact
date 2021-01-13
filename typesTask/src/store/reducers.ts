import {DataState,DataActionTypes,ADD_ITEM,DELETE_ITEM,UPDATE_ITEM} from './types';
const initialState:DataState= {
    data:[],
}

export function DataReducer(state=initialState,action:DataActionTypes):DataState{
    switch(action.type){
        case ADD_ITEM:
            return{
                data:[...state.data,action.payload.data]
            };
        case DELETE_ITEM:
            return{
                data: state.data.filter(e=> e.id !== action.meta.id)
            }


        default:
            return state;
    }
}