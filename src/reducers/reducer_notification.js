import { actionTypes } from '../config';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case actionTypes.FETCH_NOTIFICATIONS:
            return _.reverse(action.payload.data.data);
        case actionTypes.DELETE_NOTIFICATION:
            return _.reverse(action.payload.data.data);
        case actionTypes.CLEAR_NOTIFICATIONS:
            return action.payload;
        default:
            return state;
    }
}