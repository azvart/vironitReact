import {applyMiddleware,combineReducers,createStore,Store} from 'redux';

import thunk from 'redux-thunk';
import {reducer,ListState} from './reducer';


export interface ListAppState{
    list:ListState;
}

export const rootReducer = combineReducers<ListAppState>({
    list:reducer
});


export default function configureStore():Store<ListAppState,any>{
    const store = createStore(rootReducer,undefined,applyMiddleware(thunk));
    return store;
}