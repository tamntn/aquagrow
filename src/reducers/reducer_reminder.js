import { actionTypes } from '../config';
import _ from 'lodash';

export default function (state = [], action) {
    switch (action.type) {
        case actionTypes.FETCH_MESSAGES:
            return state;
        case actionTypes.DELETE_MESSAGE:
            return state;
        case actionTypes.CLEAR_MESSAGES:
            return state;
        default:
            return state;
    }
}