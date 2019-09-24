
import { Login } from './constants.login';

const initialState = {
    userDetail: "",
    authError: false,
    passwordChanged: false,
    invalidEmail: false
}


function rootReducer(state = initialState, action) {

    switch (action.type) {


        case Login.SAVE_LOGIN_DATA:
            const userDetails = action.payload;
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            return {
                ...state,
                userDetail: action.payload,
                authError: false

            }
        case Login.AUTH_ERROR:
            return {
                ...state,
                authError: true
            }

        case Login.INVALID_EMAIL:
            return {
                ...state,
                invalidEmail: true
            }

        case Login.SAVE_NEW_DATA:
            return {
                ...state,
                passwordChanged: action.payload,
                invalidEmail: false
            }

        default:
            return state;

    }
}

export default rootReducer;