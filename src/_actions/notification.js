export const NOTIFICATION = 'NOTIFICATION';

export function notification(message) {
  console.log("--- --- NOTIFICATION ACTOIN --- ---")
  return async (dispatch) => {
    dispatch({ type: NOTIFICATION, payload: message });
  }
}

