import axios from 'axios';

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
    const request = axios.post(url, formInput)
        .then(() => callback());
    return {
        type: actionType.REGISTER,
        payload: request
    }
}

export function authenticate(username, password) {
    const url = `${ROOT_URL}/signin`;
    const body = {
        username: username.toLowerCase(),
        password: password
    };
    // Will return a Promise
    const request = axios.post(url, body)
    return {
        type: actionType.AUTHENTICATE,
        payload: request
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