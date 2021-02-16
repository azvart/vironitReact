import UserRootReducer from './index';
import {createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
export const store = createStore(UserRootReducer,undefined,composeWithDevTools(applyMiddleware(thunk)));