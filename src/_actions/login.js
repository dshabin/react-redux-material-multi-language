import { apiUrl } from '../config/config'; // eslint-disable-line
import { NOTIFICATION } from './notification'
import { USER } from './app'

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const RESET = 'RESET';

export function loginRequest(username, password) {
    console.log("--- --- LOGIN_REQUEST ACTOIN --- ---")
    return async (dispatch) => {
        try {
            dispatch({ type: LOGIN_PENDING, payload: true });
            const data = { username, password };
            let result = await fetch(`${apiUrl}/api/auth/login/`,
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                });
            result = await result.json();
            console.log(result)
            if (result.error) {
                dispatch({ type: LOGIN_ERROR, payload: result.error.message.toString() });
                dispatch({ type: NOTIFICATION, payload: { type: 'error', 'message': result.error.message.toString() } });
            }else{
                localStorage.setItem('token' , result.data.token)
                dispatch({ type: LOGIN_SUCCESS, payload: result.data });
                dispatch({ type: USER, payload: result.data });
            }
        } catch (error) {
            dispatch({ type: LOGIN_ERROR, payload: error.toString() });
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