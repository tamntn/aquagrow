import axios from 'axios';
import _ from 'lodash';

const ROOT_URL = 'https://aquagrow.life/api'

export const actionType = {
    FETCH_USER: 'fetch_user',
    REGISTER: 'register',
    AUTHENTICATE: 'authenticate',
    LOGOUT: 'logout',
    CLEAR_ERROR: 'clear_error'
}

export function fetchUser(username) {
    const url = `${ROOT_URL}/user/${username}`;
    const request = axios.get(url);
    return {
        type: actionType.FETCH_USER,
        payload: request
    }
}

export function register(formInput, callback) {
    const url = `${ROOT_URL}/user`;
    formInput.username = formInput.username.toLowerCase();
    const request = axios.post(url, formInput)
        .then(() => callback());
    return {
        type: actionType.REGISTER,
        payload: request
    }
}

export async function authenticate(formInput, callback) {
    const url = `${ROOT_URL}/signin`;
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