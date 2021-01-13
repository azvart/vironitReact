import {DataReducer} from './reducers';
import {combineReducers} from 'redux';
const rootReducer = combineReducers({
    data:DataReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;