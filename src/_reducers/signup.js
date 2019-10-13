import { SIGNUP_PENDING } from '../_actions/signup';
import { SIGNUP_ERROR } from '../_actions/signup';
import { SIGNUP_SUCCESS } from '../_actions/signup';
import { RESET } from '../_actions/signup';

const DEFAULT_STATE = {}

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case SIGNUP_PENDING:
            console.log('--- --- SIGNUP_PENDING REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: true
            };

        case SIGNUP_ERROR:
            console.log('--- --- SIGNUP_ERROR REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                error: action.payload
            };

        case SIGNUP_SUCCESS:
            console.log('--- --- SIGNUP_SUCCESS REDUCER --- ---', action.payload);
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