import axios from 'axios';
import { apiRoutes, actionType } from '../config';
const { rootUrl } = apiRoutes;

export function fetchUser(username) {
    const url = `${rootUrl}/user/${username}`;
    const request = axios.get(url);
    return {
        type: actionType.FETCH_USER,
        payload: request
    }
}

export function register(formInput, callback) {
    const url = `${rootUrl}/user`;
    formInput.username = formInput.username.toLowerCase();
    const request = axios.post(url, formInput)
        .then(() => callback());
    return {
        type: actionType.REGISTER,
        payload: request
    }
}

export async function authenticate(formInput, callback) {
    const url = `${rootUrl}/signin`;
    let payload = false;
    formInput.username = formInput.username.toLowerCase();
    // Will return a Promise
    await axios.post(url, formInput)
        .then((res) => {
            payload = res;
            callback(true);
        })
        .catch((err) => {
            callback(false)
        });
    return {
        type: actionType.AUTHENTICATE,
        payload: payload
    }
}

export function logout(callback) {
    callback();
    return {
        type: actionType.LOGOUT,
        payload: null
    }
}

export function clearError() {
    return {
        type: actionType.CLEAR_ERROR,
        payload: null
    }
}