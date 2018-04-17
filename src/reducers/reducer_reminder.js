import { actionTypes } from '../config';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case actionTypes.FETCH_REMINDERS:
            return _.reverse(action.payload.data.data);
        case actionTypes.DELETE_REMINDER:
            return _.reverse(action.payload.data.data);
        case actionTypes.CLEAR_REMINDERS:
            return action.payload;
        default:
            return state;
    }
}