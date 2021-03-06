import { actionTypes } from '../config';

export default function (state = null, action) {
    switch (action.type) {
        // case actionTypes.REGISTER:
        //     console.log(action.payload);
        //     return action.payload.data.data;
        case actionTypes.FETCH_USER:
            return action.payload.data.data;
        case actionTypes.LOGOUT:
            localStorage.clear();
            return null;
        case actionTypes.DELETE_USER:
            localStorage.clear();
            return action.payload;
        default:
            return state;
    }
}