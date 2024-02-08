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
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    return res.json()
                } else {
                    throw new Error("Something Went Wrong")
                }
            })
            .then(data => {
                if (data === "INVALID_PASSWORD") {
                    dispatch({
                        type: Login.AUTH_ERROR,
                        payload: "Invalid Password"
                    })
                }
                else if (data === "INVALID_EMAIL") {
                    dispatch({
                        type: Login.AUTH_ERROR,
                        payload: "Invalid Email"
                    })
                } else if(data && data.length > 0) {
                    dispatch({
                        type: Login.SAVE_LOGIN_DATA,
                        payload: data
                    })
                }
                setTimeout(() => {
                    dispatch({
                        type: Login.AUTH_ERROR,
                        payload: ""
                    })
                }, 2000)
            })
            .catch(err => {
                dispatch({
                    type: Login.AUTH_ERROR,
                    payload: "Something Went Wrong"
                })

                setTimeout(() => {
                    dispatch({
                        type: Login.AUTH_ERROR,
                        payload: ""
                    })
                }, 2000)
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
                dispatch({
                    type: Login.AUTH_ERROR,
                    payload: "Something Went Wrong"
                })

                setTimeout(() => {
                    dispatch({
                        type: Login.AUTH_ERROR,
                        payload: ""
                    })
                }, 2000)
              
            })
    }
}

