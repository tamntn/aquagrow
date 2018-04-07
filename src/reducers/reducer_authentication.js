import { actionType } from '../config';

export default function (state = false, action) {
    switch (action.type) {
        case actionType.AUTHENTICATE:
            // If authenticate returns with an error
            if (!action.payload) {
                return action.payload;
            } else {
                localStorage.setItem('jwt', action.payload.data.token);
                localStorage.setItem('username', action.payload.data.user.username);
                return true;
            }
        case actionType.LOGOUT:
            localStorage.clear();
            return false;
        case actionType.CLEAR_ERROR:
            return false;
        default:
            const loggedIn = localStorage.getItem('jwt') ? true : false;
            return loggedIn;
    }
}