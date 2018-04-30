import { actionTypes } from '../config';

export default function (data = null, action) {
    switch (action.type) {
        case actionTypes.FETCH_LATEST_DATA:
            return action.payload.data.data[0];
        default:
            return data
    }
}