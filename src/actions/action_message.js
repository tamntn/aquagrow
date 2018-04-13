import axios from 'axios';
import { apiRoutes, actionTypes } from '../config';
const { rootUrl } = apiRoutes;


// FETCH ALL MESSAGES
export function fetchMessages(username) {
    const url = `${rootUrl}/message/${username}`;
    const request = axios.get(url);
    return {
        type: actionTypes.FETCH_MESSAGES,
        payload: request
    }
}

// DELETE A SINGLE MESSAGE
export async function deleteMessage(username, key, callback) {
    const deleteUrl = `${rootUrl}/message/${username}/${key}`;
    const getUrl = `${rootUrl}/message/${username}`;
    let payload = [];
    await axios.delete(deleteUrl)
        .then(() => {
            payload = axios.get(getUrl)
            callback();
        })
    return {
        type: actionTypes.DELETE_MESSAGE,
        payload: payload
    }
}

// CLEAR ALL MESSAGES
export async function clearMessages(username, callback) {
    const url = `${rootUrl}/message/${username}`;
    await axios.delete(url)
        .then(() => {
            callback();
        });
    return {
        type: actionTypes.CLEAR_MESSAGES,
        payload: []
    }
}