import { actionType } from '../actions/action_user';

export default function (state = null, action) {
    switch (action.type) {
        case actionType.FETCH_USER:
            return action.payload.data.data;
        case actionType.LOGOUT:
            localStorage.clear();
            return null;
    }

    return state;
}