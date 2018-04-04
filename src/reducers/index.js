import { combineReducers } from 'redux';
import AuthenticationReducer from './reducer_authentication';
import UserReducer from './reducer_user';

const rootReducer = combineReducers({
    loggedIn: AuthenticationReducer,
    user: UserReducer
});

export default rootReducer;
