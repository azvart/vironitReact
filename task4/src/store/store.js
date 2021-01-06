import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';

import Reducer from './reducer';


const State = {

}

const middleware = [thunk];

 const store = createStore(Reducer,State,composeWithDevTools(applyMiddleware(...middleware)));
 export default store;