import { LOGIN_PENDING } from '../_actions/login';
import { LOGIN_ERROR } from '../_actions/login';
import { LOGIN_SUCCESS } from '../_actions/login';
import { RESET } from '../_actions/login';

const DEFAULT_STATE = {}

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case LOGIN_PENDING:
            console.log('--- --- LOGIN_PENDING REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: true
            };

        case LOGIN_ERROR:
            console.log('--- --- LOGIN_ERROR REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                error: action.payload
            };

        case LOGIN_SUCCESS:
            console.log('--- --- LOGIN_SUCCESS REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                user: action.payload
            };
        case RESET:
            console.log('--- --- RESET REDUCER --- ---', action.payload);
            return {};

        default:
            return state
    }
}