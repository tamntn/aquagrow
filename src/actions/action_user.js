import axios from 'axios';
import { apiRoutes, actionTypes } from '../config';
const { rootUrl } = apiRoutes;

export function fetchUser(username) {
    const url = `${rootUrl}/user/${username}`;
    const request = axios.get(url);
    return {
        type: actionTypes.FETCH_USER,
        payload: request
    }
}

export async function updateUser(username, updateValues, callback) {
    const url = `${rootUrl}/user/${username}`;
    const request = await axios.put(url, updateValues);
    callback();
    return {
        type: actionTypes.UPDATE_USER,
        payload: request
    }
}

export async function deleteUser(userId, callback) {
    console.log(userId);
    const url = `${rootUrl}/user/${userId}`;
    await axios.delete(url);
    callback();
    return {
        type: actionTypes.DELETE_USER,
        payload: null
    }
}

export function register(formInput, callback) {
    const url = `${rootUrl}/user`;
    formInput.username = formInput.username.toLowerCase();
    const request = axios.post(url, formInput)
        .then(() => callback());
    return {
        type: actionTypes.REGISTER,
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
        type: actionTypes.AUTHENTICATE,
        payload: payload
    }
}

export function logout(callback) {
    callback();
    return {
        type: actionTypes.LOGOUT,
        payload: null
    }
}