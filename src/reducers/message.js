import { ADD_MESSAGE, CLEAR_MESSAGE } from '../actions/index';


export default function (state = null, action) {
    switch (action.type) {
    case ADD_MESSAGE:
        return { message: action.message, messClass: action.messClass };
        break;
    case CLEAR_MESSAGE:
        return null;
        break;
    default:
        return state;
    }
}
