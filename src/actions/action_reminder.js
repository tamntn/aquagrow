import axios from 'axios';
import { apiRoutes, actionTypes } from '../config';
const { rootUrl } = apiRoutes;


// FETCH ALL REMINDERS
export function fetchReminders(username) {
    const url = `${rootUrl}/reminder/${username}`;
    const request = axios.get(url);
    return {
        type: actionTypes.FETCH_REMINDERS,
        payload: request
    }
}

// DELETE A SINGLE REMINDER
export async function deleteReminder(username, key, callback) {
    const deleteUrl = `${rootUrl}/reminder/${username}/${key}`;
    const getUrl = `${rootUrl}/reminder/${username}`;
    let payload = [];
    await axios.delete(deleteUrl)
        .then(() => {
            payload = axios.get(getUrl)
            callback();
        })
    return {
        type: actionTypes.DELETE_REMINDER,
        payload: payload
    }
}

// CLEAR ALL REMINDERS
export async function clearReminders(username, callback) {
    const url = `${rootUrl}/reminder/${username}`;
    await axios.delete(url)
        .then(() => {
            callback();
        });
    return {
        type: actionTypes.CLEAR_REMINDERS,
        payload: []
    }
}