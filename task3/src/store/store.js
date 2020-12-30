import {createStore} from 'redux';
import {Reducer,State} from './reducer/index';

export const store =createStore(Reducer,State);