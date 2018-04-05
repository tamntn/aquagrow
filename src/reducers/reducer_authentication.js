import { actionType } from '../actions/action_user';

export default function (state = false, action) {
    switch (action.type) {
        case actionType.AUTHENTICATE:
            // If authenticate returns with an error
            if (action.payload.response) {
                return action.payload.response.data;
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
            return state;
    }
}