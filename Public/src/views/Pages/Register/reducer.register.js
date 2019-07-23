
import { Register } from './constants.register';

const initialState = {
    error: "",
    userRegistered: false
}


function rootReducer(state = initialState, action) {

    switch (action.type) {


        case Register.DUPLICATE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case Register.USER_REGISTERED:
            return {
                ...state,
                userRegistered: true
            }
        case Register.USER_CREATED_SET_FALSE:
            return {
                ...state,
                userRegistered: false
            }

        default:
            return state;

    }
}

export default rootReducer;