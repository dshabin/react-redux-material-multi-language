import { SELECT_LANGUAGE, USER, LOGOUT, FETCH_CURRENT_PENDING, FETCH_CURRENT_ERROR, FETCH_CURRENT_SUCCESS } from '../_actions/app';

const DEFAULT_STATE = {
    language: 'english',
}

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SELECT_LANGUAGE:
            console.log('--- --- SELECT_LANGUAGE REDUCER --- ---', action.payload);
            return { ...state, language: action.payload };
        case USER:
            console.log('--- --- USER REDUCER --- ---', action.payload);
            return { ...state, user: action.payload };
        case LOGOUT:
            console.log('--- --- LOGOUT REDUCER --- ---', action.payload);
            localStorage.removeItem('token')
            return { ...state, user: null };

        case FETCH_CURRENT_PENDING:
            console.log('--- --- FETCH_CURRENT_PENDING REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: true
            };

        case FETCH_CURRENT_ERROR:
            console.log('--- --- FETCH_CURRENT_ERROR REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                error: action.payload
            };

        case FETCH_CURRENT_SUCCESS:
            console.log('--- --- FETCH_CURRENT_SUCCESS REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                error: action.payload
            };


        default:
            return state
    }
}