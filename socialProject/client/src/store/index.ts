import UserReducer from './reducer';
import {combineReducers} from 'redux';

const UserRootReducer = combineReducers({
    UserReducer
});


export type UserRootState = ReturnType<typeof UserRootReducer >;

export default UserRootReducer;