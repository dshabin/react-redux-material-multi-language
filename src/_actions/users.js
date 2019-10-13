import { apiUrl } from '../config/config'; // eslint-disable-line
import { NOTIFICATION } from './notification'

export const LIST_USERS_PENDING = 'LIST_USERS_PENDING';
export const LIST_USERS_ERROR = 'LIST_USERS_ERROR';
export const LIST_USERS_SUCCESS = 'LIST_USERS_SUCCESS';

export const GET_USER_PENDING = 'GET_USER_PENDING';
export const GET_USER_ERROR = 'GET_USER_ERROR';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const ADD_USER_PENDING = 'ADD_USER_PENDING';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';

export const UPDATE_USER_PENDING = 'UPDATE_USER_PENDING';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export const DELETE_USER_PENDING = 'DELETE_USER_PENDING';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

export const RESET = 'RESET';


export function listUsers(params) {
    console.log("--- --- LIST_USERS ACTOIN --- ---")
    return async (dispatch) => {
        try {
            dispatch({ type: LIST_USERS_PENDING, payload: true });
            const esc = encodeURIComponent;
            const query = Object.keys(params)
                .map(k => `${esc(k)}=${esc(params[k])}`)
                .join('&');
            let result = await fetch(`${apiUrl}/api/users/?${query}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    },
                });
            result = await result.json();
            if (result.error) {
                dispatch({ type: LIST_USERS_ERROR, payload: result.error.message.toString() });
            } else {
                dispatch({ type: LIST_USERS_SUCCESS, payload: result.data });
            }
        } catch (error) {
            dispatch({ type: LIST_USERS_ERROR, payload: error.toString() });
            dispatch({ type: NOTIFICATION, payload: { type: 'error', 'message': error.toString() } });
            return
        }
    }
}

export function getUser(id) {
    console.log("--- --- GET_USER ACTOIN --- ---")
    return async (dispatch) => {
        try {
            dispatch({ type: GET_USER_PENDING, payload: true });
            let result = await fetch(`${apiUrl}/api/users/${id}/`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    },
                });
            result = await result.json();
            if (result.error) {
                dispatch({ type: GET_USER_ERROR, payload: result.error.message.toString() });
            } else {
                dispatch({ type: GET_USER_SUCCESS, payload: result.data });
            }
        } catch (error) {
            dispatch({ type: GET_USER_ERROR, payload: error.toString() });
            dispatch({ type: NOTIFICATION, payload: { type: 'error', 'message': error.toString() } });
            return
        }
    }
}

export function addUser(params) {
    console.log("--- --- ADD_USER ACTOIN --- ---")
    return async (dispatch) => {
        try {
            dispatch({ type: ADD_USER_PENDING, payload: true });
            let result = await fetch(`${apiUrl}/api/users/`,
                {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    },
                });
            result = await result.json();
            if (result.error) {
                dispatch({ type: ADD_USER_ERROR, payload: result.error.message.toString() });
                dispatch({ type: NOTIFICATION, payload: { type: 'error', 'message': result.error.message.toString() } });
            } else {
                dispatch({ type: ADD_USER_SUCCESS, payload: result.data });
            }
        } catch (error) {
            dispatch({ type: ADD_USER_ERROR, payload: error.toString() });
            dispatch({ type: NOTIFICATION, payload: { type: 'error', 'message': error.toString() } });
            return
        }
    }
}

export function updateUser(id,params) {
    console.log("--- --- UPDATE_USER ACTOIN --- ---")
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATE_USER_PENDING, payload: true });
            let result = await fetch(`${apiUrl}/api/users/${id}/`,
                {
                    method: 'PUT',
                    body: JSON.stringify(params),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    },
                });
            result = await result.json();
            if (result.error) {
                dispatch({ type: UPDATE_USER_ERROR, payload: result.error.message.toString() });
                dispatch({ type: NOTIFICATION, payload: { type: 'error', 'message': result.error.message.toString() } });

            } else {
                dispatch({ type: UPDATE_USER_SUCCESS, payload: result.data });

            }
        } catch (error) {
            dispatch({ type: UPDATE_USER_ERROR, payload: error.toString() });
            dispatch({ type: NOTIFICATION, payload: { type: 'error', 'message': error.toString() } });
            return
        }
    }
}

export function deleteUser(id) {
    console.log("--- --- DELETE_USER ACTOIN --- ---")
    return async (dispatch) => {
        try {
            dispatch({ type: DELETE_USER_PENDING, payload: true });
            let result = await fetch(`${apiUrl}/api/users/${id}/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    },
                });
            result = await result.json();
            if (result.error) {
                dispatch({ type: DELETE_USER_ERROR, payload: result.error.message.toString() });
                dispatch({ type: NOTIFICATION, payload: { type: 'error', 'message': result.error.message.toString() } });

            } else {
                dispatch({ type: DELETE_USER_SUCCESS, payload: result.data });

            }
        } catch (error) {
            dispatch({ type: DELETE_USER_ERROR, payload: error.toString() });
            dispatch({ type: NOTIFICATION, payload: { type: 'error', 'message': error.toString() } });
            return
        }
    }
}


export function reset() {
    console.log("--- --- RESET ACTOIN --- ---")
    return async (dispatch) => {
        dispatch({ type: RESET, payload: true });
    }
}