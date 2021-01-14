import {Reducer} from 'redux';
import {ListActions,ListActionsType,ListAllActions} from './actions';

export interface List{
    data:any,
    id:any,
    name:any
};

export interface ListState{
    readonly list:List[]
};

const initialState:ListState = {
    list:[]
};

export const reducer:Reducer<ListState,ListActions> = (
    state=initialState,
    action
) =>{
    switch(action.type){
        case ListActionsType.GET_LIST:{
            return {
                ...state,
                list:action.list
            }
        }
        default:
            return state;
    }
}