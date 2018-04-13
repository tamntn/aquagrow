import { actionTypes } from '../config';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case actionTypes.FETCH_MESSAGES:
            return _.reverse(action.payload.data.data);
        case actionTypes.DELETE_MESSAGE:
            return _.reverse(action.payload.data.data);
        case actionTypes.CLEAR_MESSAGES:
            return action.payload;
        default:
            return state;
    }
}