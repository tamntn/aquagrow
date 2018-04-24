import axios from 'axios';
import { apiRoutes, actionTypes } from '../config';
const { rootUrl } = apiRoutes;

// FETCH SYSTEM STATUS
export function fetchSystemStatus(username) {
    const url = `${rootUrl}/system/${username}`;
    const request = axios.get(url);
    return {
        type: actionTypes.FETCH_SYSTEM_STATUS,
        payload: request
    }
}

// UPDATE SYSTEM STATUS
export async function updateSystemStatus(username, updateValues, callback) {
    const url = `${rootUrl}/system/${username}`;
    const request = await axios.put(url, updateValues);
    callback();
    return {
        type: actionTypes.UPDATE_SYSTEM_STATUS,
        payload: request
    }
}