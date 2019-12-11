import { UserDetail } from './userDetail.constants';
import { JobDetail } from '../Jobs/jobs.constants';
import { API_ROOT, URI, StringFormat } from '../../config/config';
import {ProfileDetail} from '../../views/Profile/profile.constants';

export const CreateUserHandler = () => {
    return (dispatch) => {
        dispatch({
            type: UserDetail.CREATE_USER,
        })
        dispatch({ type: UserDetail.CREATE_NEW_USER, payload: false })
    }
}

export const getUserSuggestions=()=>{
    return (dispatch) => {
        fetch(API_ROOT + URI.USERLIST_SUGGESTIONS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: UserDetail.USER_SUGGESTIONS,
                    payload: data
                })
                if(data.length>0) {
                    let result = []
                    data.map((user) => {
                        result.push({name: user.firstName + " " + user.lastName, id: user.userId })
                    })
                    dispatch({
                        type: JobDetail.SAVE_USER_LIST,
                        payload: result
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: UserDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}

export const GetUserList = (offset) => {
    return (dispatch) => {
        fetch (StringFormat(API_ROOT + URI.GET_USERLIST,offset ),{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: UserDetail.GET_USER_LIST,
                    payload: data
                })
                // if(data.result.length>0) {
                //     let result = []
                //     data.result.map((user) => {
                //         result.push({name: user.firstName + " " + user.lastName, id: user.userId })
                //     })
                //     dispatch({
                //         type: JobDetail.SAVE_USER_LIST,
                //         payload: result
                //     })
                // }
               
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: UserDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}

export const searchUser = (data) => {
    let qq = API_ROOT.concat(`${URI.GET_USER_BY_SEARCH}?firstName=${data.firstName || ''}&lastName=${data.lastName || ''}&email=${data.email || ''}&role=${data.role || ''}`);
    return (dispatch) => {
        return fetch(qq, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: UserDetail.GET_USER_LIST,
                    payload: data
                })
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: UserDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}


export const CreateNewUser = (values) => {
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
                if (data === "USER_ALREADY_REGISTERED") {
                    dispatch({
                        type: UserDetail.DUPLICATE_USER_ERROR,
                        payload: true
                    })
                }
                
                else if (data == "USER_CREATED") {
                    dispatch({ 
                        type: UserDetail.CREATE_NEW_USER, 
                        payload: true 
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: UserDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}


export const deleteUserData = (id) => {
    return (dispatch) => {
        fetch(StringFormat(API_ROOT + URI.DELETE_USER, id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: UserDetail.DELETE_USER,
                    payload: true
                })
                dispatch({
                    type: JobDetail.GET_SEARCH,
                    payload: true
                })
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: UserDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}

export const updateUserDetails = (id, values) => {
    return (dispatch) => {
        fetch(StringFormat(API_ROOT + URI.UPDATE_USER, id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: UserDetail.UPDATE_USER,
                    payload: data
                });
                dispatch({
                    type: UserDetail.USER_UPDTAED,
                    payload: true
                })
                setTimeout(()=>{
                    dispatch({
                        type: UserDetail.USER_UPDTAED,
                        payload: false
                    })
                },1500)
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: UserDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}

// export const CreateNewUser = (data) => {
//     return (dispatch) => {

//         dispatch({
//             type: UserDetail.CREATE_NEW_USER,
//             payload:data
//         })
//     }
// }

// export const deleteUserData = (index) => {
//     return (dispatch) => {

//         dispatch({
//             type: UserDetail.DELETE_USER,
//             payload: index
//         })
//     }
// }


export const updateUser = (data) => {
    return (dispatch) => {

        dispatch({
            type: UserDetail.UPDATE_USER,
            payload: data
        })
    }
}

