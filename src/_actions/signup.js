import { apiUrl } from '../config/config'; // eslint-disable-line
import { NOTIFICATION } from './notification'
import { USER } from './app'

export const SIGNUP_PENDING = 'SIGNUP_PENDING';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const RESET = 'RESET';

export function signupRequest(username, password) {
    console.log("--- --- LOGIN_REQUEST ACTOIN --- ---")
    return async (dispatch) => {
        try {
            dispatch({ type: SIGNUP_PENDING, payload: true });
            const data = { username, password };
            let result = await fetch(`${apiUrl}/api/users/`,
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
                dispatch({ type: SIGNUP_ERROR, payload: result.error.message.toString() });
                dispatch({ type: NOTIFICATION, payload: { type: 'error', 'message': result.error.message.toString() } });
            }else{
                localStorage.setItem('token' , result.data.token)
                dispatch({ type: SIGNUP_SUCCESS, payload: result.data });
                dispatch({ type: USER, payload: result.data });
            }
        } catch (error) {
            dispatch({ type: SIGNUP_ERROR, payload: error.toString() });
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