import { API_ROOT, URI } from '../../../config/config';
import { Login } from '../Login/constants.login'

export const login = (values) => {
    return (dispatch) => {
        fetch(API_ROOT + URI.LOGIN_USER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                if (data === "INVALID_USER") {
                    dispatch({
                        type: Login.AUTH_ERROR,
                    })
                }
                else {
                    dispatch({
                        type: Login.SAVE_LOGIN_DATA,
                        payload: data
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const forgotPassword = (values) => {
    return (dispatch) => {
        fetch(API_ROOT + URI.FORGOT_PASSWORD, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                if (data === "INVALID_EMAIL") {
                    dispatch({
                        type: Login.INVALID_EMAIL,
                    })
                }
                else if (data === "PASSWORD_UPDATED") {
                    dispatch({
                        type: Login.SAVE_NEW_DATA,
                        payload: true
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
}

