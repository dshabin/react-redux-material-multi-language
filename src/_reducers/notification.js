import { NOTIFICATION} from '../_actions/notification'

const DEFAULT_STATE = {}

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case NOTIFICATION:
            console.log('--- --- NOTIFICATION REDUCER --- ---', action.payload);
            return {
                ...state,
                notification: action.payload
            };
        default:
            return state
    }
}