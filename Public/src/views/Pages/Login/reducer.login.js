
import { Login } from './constants.login';
import socketIOClient from "socket.io-client";
import { APP_ROOT } from "../../../config/config";
import { updateUserNotifcations } from '../../User/User/UserHelpers';

const initialState = {
    userDetail: "",
    authError: "",
    passwordChanged: false,
    invalidEmail: false
}


function rootReducer(state = initialState, action) {

    switch (action.type) {


        case Login.SAVE_LOGIN_DATA:
            const userDetails = action.payload;
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            window.clientSocket = window.clientSocket ? window.clientSocket : socketIOClient(APP_ROOT);
            window.clientSocket.emit('user logged in', userDetails[0]);
            window.clientSocket.on('update notifications', (result) => {
                console.log("updating notificaions...");
                updateUserNotifcations(userDetails[0].userId);
            });
            return {
                ...state,
                userDetail: action.payload,
            }
        case Login.AUTH_ERROR:
            return {
                ...state,
                authError: action.payload
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