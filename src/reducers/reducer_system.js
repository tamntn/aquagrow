import { actionTypes } from '../config';

export default function (system = null, action) {
    switch (action.type) {
        case actionTypes.FETCH_SYSTEM_STATUS:
            return action.payload.data.data;
        default:
            return system;
    }
}