import { LIST_USERS_PENDING } from '../_actions/users';
import { LIST_USERS_ERROR } from '../_actions/users';
import { LIST_USERS_SUCCESS } from '../_actions/users';

import { ADD_USER_PENDING } from '../_actions/users';
import { ADD_USER_SUCCESS } from '../_actions/users';
import { ADD_USER_ERROR } from '../_actions/users';

import { GET_USER_PENDING } from '../_actions/users';
import { GET_USER_SUCCESS } from '../_actions/users';
import { GET_USER_ERROR } from '../_actions/users';

import { UPDATE_USER_PENDING } from '../_actions/users';
import { UPDATE_USER_SUCCESS } from '../_actions/users';
import { UPDATE_USER_ERROR } from '../_actions/users';

import { DELETE_USER_PENDING } from '../_actions/users';
import { DELETE_USER_SUCCESS } from '../_actions/users';
import { DELETE_USER_ERROR } from '../_actions/users';

import { RESET } from '../_actions/users';

const DEFAULT_STATE = {}

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case LIST_USERS_PENDING:
            console.log('--- --- LIST_USERS_PENDING REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: true
            };

        case LIST_USERS_ERROR:
            console.log('--- --- LIST_USERS_ERROR REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                error: action.payload
            };

        case LIST_USERS_SUCCESS:
            console.log('--- --- LIST_USERS_SUCCESS REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                users: action.payload
            };

        case ADD_USER_PENDING:
            console.log('--- --- LIST_USERS_PENDING REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: true
            };

        case ADD_USER_ERROR:
            console.log('--- --- LIST_USERS_ERROR REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                error: action.payload
            };

        case ADD_USER_SUCCESS:
            console.log('--- --- LIST_USERS_SUCCESS REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                createdUser: action.payload
            };



        case GET_USER_PENDING:
            console.log('--- --- GET_USER_PENDING REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: true
            };

        case GET_USER_ERROR:
            console.log('--- --- GET_USER_ERROR REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                error: action.payload
            };

        case GET_USER_SUCCESS:
            console.log('--- --- GET_USER_SUCCESS REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                user: action.payload
            };




        case UPDATE_USER_PENDING:
            console.log('--- --- UPDATE_USER_PENDING REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: true
            };

        case UPDATE_USER_ERROR:
            console.log('--- --- UPDATE_USER_ERROR REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                error: action.payload
            };

        case UPDATE_USER_SUCCESS:
            console.log('--- --- UPDATE_USER_SUCCESS REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                updated: action.payload
            };





        case DELETE_USER_PENDING:
            console.log('--- --- DELETE_USER_PENDING REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: true
            };

        case DELETE_USER_ERROR:
            console.log('--- --- DELETE_USER_ERROR REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                error: action.payload
            };

        case DELETE_USER_SUCCESS:
            console.log('--- --- DELETE_USER_SUCCESS REDUCER --- ---', action.payload);
            return {
                ...state,
                pending: false,
                deleted : action.payload
            };





        case RESET:
            console.log('--- --- RESET REDUCER --- ---', action.payload);
            return {};


        default:
            return state
    }
}