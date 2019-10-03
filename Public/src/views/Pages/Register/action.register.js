
import { API_ROOT, URI } from '../../../config/config';
import { Register } from './constants.register'



export const saveRegistrationDetails = (values) => {
    return (dispatch) => {
        fetch(API_ROOT + URI.CREATE_USER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                if (data == "USER_ALREADY_REGISTERED") {
                    dispatch({
                        type: Register.DUPLICATE_ERROR,
                        payload: data
                    })
                } else {
                    dispatch({ type: Register.USER_REGISTERED })
                }

            })
            .catch(err => {
            })
    }
}

export const userCreateFalse = () => {
    return (dispatch) => {
        dispatch({
            type: Register.USER_CREATED_SET_FALSE
        })
    }
}