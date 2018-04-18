import { actionTypes } from '../config';

export default function (state = false, action) {
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
            // If authenticate returns with an error
            console.log(action.payload);
            if (!action.payload) {
                return action.payload;
            } else {
                localStorage.setItem('jwt', action.payload.data.token);
                localStorage.setItem('username', action.payload.data.user.username);
                return true;
            }
        case actionTypes.LOGOUT:
            localStorage.clear();
            return false;
        case actionTypes.DELETE_USER:
            return false;
        default:
            const loggedIn = localStorage.getItem('jwt') ? true : false;
            return loggedIn;
    }
}