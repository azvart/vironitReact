import { ActionCreator,Dispatch} from 'redux';

import {ThunkAction} from 'redux-thunk';

import axios from 'axios';

import {List,ListState} from './reducer';


export enum ListActionsType{
    GET_LIST = "GET_LIST",
}


export interface ListAllActions{
    type: ListActionsType.GET_LIST;
    list:List[];
}

export type  ListActions = ListAllActions;

export const GetAllList:ActionCreator<ThunkAction<Promise<any>,ListState,null,ListAllActions>>=()=>{
    return async (dispatch:Dispatch)=>{
        try{
            const response = await axios.get('https://api.coingecko.com/api/v3/exchanges/list');
            dispatch({
                list:response.data,
                type:ListActionsType.GET_LIST
            });
        }catch (err) {
            console.error(err);
        }
    }
};