import axios from 'axios';
import { apiRoutes, actionTypes } from '../config';
const { rootUrl } = apiRoutes;

// FETCH ALL REMINDER SETTINGS
export function fetchReminderSetting(username) {
    const url = `${rootUrl}/reminderSetting/${username}`;
    const request = axios.get(url);
    return {
        type: actionTypes.FETCH_REMINDER_SETTING,
        payload: request
    }
}

// ADD A NEW REMINDER SETTING
export async function createReminderSetting(username, newReminderSetting) {
    const url = `${rootUrl}/reminderSetting/${username}`;
    let payload = [];

    await axios.post(url, newReminderSetting)
        .then(() => {
            payload = axios.get(url)
        })

    return {
        type: actionTypes.CREATE_REMINDER_SETTING,
        payload: payload
    }
}

// UPDATE A REMINDER SETTING
export async function updateReminderSetting(username, reminderSettingId, updateValues) {
    const updateUrl = `${rootUrl}/reminderSetting/${reminderSettingId}`;
    const getUrl = `${rootUrl}/reminderSetting/${username}`;
    let payload = [];

    await axios.put(updateUrl, updateValues)
        .then(() => {
            payload = axios.get(getUrl)
        })
        .catch((err) => {
            console.log(err);
        })

    return {
        type: actionTypes.UPDATE_REMINDER_SETTING,
        payload: payload
    }
}

// DELETE A REMINDER SETTING
export async function deleteReminderSetting(username, reminderSettingId) {
    const deleteUrl = `${rootUrl}/reminderSetting/${reminderSettingId}`;
    const getUrl = `${rootUrl}/reminderSetting/${username}`;
    let payload = [];

    await axios.delete(deleteUrl)
        .then(() => {
            payload = axios.get(getUrl)
        })

    return {
        type: actionTypes.DELETE_REMINDER_SETTING,
        payload: payload
    }
}