import { actionTypes } from '../config';

export default function (state = [], action) {
    switch (action.type) {
        case actionTypes.FETCH_NOTIFICATIONS:
            return action.payload.data.data;
        case actionTypes.DELETE_NOTIFICATION:
            return action.payload.data.data;
        case actionTypes.CLEAR_NOTIFICATIONS:
            return action.payload;
        default:
            return state;
    }
}