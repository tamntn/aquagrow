import axios from 'axios';
import { apiRoutes, actionTypes } from '../config';
const { rootUrl } = apiRoutes;


// FETCH ALL NOTIFICATIONS
export function fetchNotifications(username) {
    const url = `${rootUrl}/notification/${username}`;
    const request = axios.get(url);
    return {
        type: actionTypes.FETCH_NOTIFICATIONS,
        payload: request
    }
}

// DELETE A SINGLE NOTIFICATION
export async function deleteNotification(username, key, callback) {
    const deleteUrl = `${rootUrl}/notification/${username}/${key}`;
    const getUrl = `${rootUrl}/notification/${username}`;
    let payload = [];
    await axios.delete(deleteUrl)
        .then(() => {
            payload = axios.get(getUrl)
            callback();
        })
    return {
        type: actionTypes.DELETE_NOTIFICATION,
        payload: payload
    }
}

// CLEAR ALL NOTIFICATIONS
export async function clearNotifications(username, callback) {
    const url = `${rootUrl}/notification/${username}`;
    await axios.delete(url)
        .then(() => {
            callback();
        });
    return {
        type: actionTypes.CLEAR_NOTIFICATIONS,
        payload: []
    }
}