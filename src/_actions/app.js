import { apiUrl } from '../config/config'; // eslint-disable-line
import { NOTIFICATION } from './notification'

export const SELECT_LANGUAGE = 'SELECT_LANGUAGE';
export const USER = 'USER';
export const LOGOUT = 'LOGOUT';

export const FETCH_CURRENT_PENDING = 'FETCH_CURRENT_PENDING';
export const FETCH_CURRENT_ERROR = 'FETCH_CURRENT_ERROR';
export const FETCH_CURRENT_SUCCESS = 'FETCH_CURRENT_SUCCESS';

export function selectLanguage(language) {
  console.log("--- --- SELECT_LANGUAGE ACTOIN --- ---")
  return async (dispatch) => {
    dispatch({ type: SELECT_LANGUAGE, payload: language });
  }
}

export function logout() {
  console.log("--- --- APP RESET ACTOIN --- ---")
  return async (dispatch) => {
      dispatch({ type: LOGOUT, payload: true });
  }
}

export function fetchCurrent() {
  console.log("--- --- FETCH_REQUEST ACTOIN --- ---")
  return async (dispatch) => {
      try {
          dispatch({ type: FETCH_CURRENT_PENDING, payload: true });
          let result = await fetch(`${apiUrl}/api/users/fetch-current/`,
              {
                  method: 'GET',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization' : `Token ${localStorage.getItem('token')}`
                  },
              });
          result = await result.json();
          if (result.error) {
              dispatch({ type: FETCH_CURRENT_ERROR, payload: result.error.message.toString() });
          }else{
              dispatch({ type: FETCH_CURRENT_SUCCESS, payload: result.data });
              dispatch({ type: USER, payload: result.data });
          }
      } catch (error) {
          dispatch({ type: FETCH_CURRENT_ERROR, payload: error.toString() });
          dispatch({ type: NOTIFICATION, payload: { type: 'error', 'message': error.toString() } });
          return
      }
  }
}