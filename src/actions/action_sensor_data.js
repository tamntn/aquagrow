import axios from 'axios';
import { apiRoutes, actionTypes } from '../config';
const { rootUrl } = apiRoutes;

// FETCH LATEST SENSOR DATA
export function fetchLatestSensorData(username) {
    const url = `${rootUrl}/system/data/latest/${username}`;
    const request = axios.get(url);
    return {
        type: actionTypes.FETCH_LATEST_DATA,
        payload: request
    }
}