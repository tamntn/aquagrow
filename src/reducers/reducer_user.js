import { actionType } from '../actions/action_user';

export default function (state = null, action) {
    switch (action.type) {
        // case actionType.REGISTER:
        //     console.log(action.payload);
        //     return action.payload.data.data;
        case actionType.FETCH_USER:
            return action.payload.data.data;
        case actionType.LOGOUT:
            localStorage.clear();
            return null;
        default:
            return state;
    }
}