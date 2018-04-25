import { actionTypes } from '../config';

export default function (reminderSetting = [], action) {
    switch (action.type) {
        case actionTypes.FETCH_REMINDER_SETTING:
            return action.payload.data.data;
        case actionTypes.CREATE_REMINDER_SETTING:
            return action.payload.data.data;
        case actionTypes.UPDATE_REMINDER_SETTING:
            return action.payload.data.data;
        case actionTypes.DELETE_REMINDER_SETTING:
            return action.payload.data.data;
        default:
            return reminderSetting;
    }
}