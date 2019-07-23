import { UserDetail } from './userDetail.constants'
// import { API_ROOT, URI } from '../../../../../src/config/config';

export const CreateUserHandler = () => {
    return (dispatch) => {

        dispatch({
            type: UserDetail.CREATE_USER,
          
        })
    }
}


export const CreateNewUser = (data) => {
    return (dispatch) => {

        dispatch({
            type: UserDetail.CREATE_NEW_USER,
            payload:data
        })
    }
}

export const deleteUserData = (index) => {
    return (dispatch) => {

        dispatch({
            type: UserDetail.DELETE_USER,
            payload:index
        })
    }
}


export const updateUser = (data) => {
    return (dispatch) => {

        dispatch({
            type: UserDetail.UPDATE_USER,
            payload:data
        })
    }
}