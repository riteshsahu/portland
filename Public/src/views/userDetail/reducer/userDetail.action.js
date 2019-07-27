import { UserDetail } from './userDetail.constants';
import { JobDetail } from '../../Jobs/reducer/jobs.constants';
import { API_ROOT, URI, StringFormat } from '../../../config/config';

export const CreateUserHandler = () => {
    return (dispatch) => {
        dispatch({
            type: UserDetail.CREATE_USER,
        })
        dispatch({ type: UserDetail.CREATE_NEW_USER, payload: false })
    }
}

export const GetUserList = () => {
    return (dispatch) => {
        fetch(API_ROOT + URI.GET_USERLIST, {
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
                console.log(err);
            })
    }
}

export const searchUser = (data) => {
    console.log('dadaaa--------------', data)
    let qq = API_ROOT.concat(`${URI.GET_USER_BY_SEARCH}?firstName=${data.firstName}&lastName=${data.lastName}&email=${data.email}&role=${data.role}`);
    console.log('query-----', qq)
    return (dispatch) => {
        fetch(qq, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("---search list---", data)
                dispatch({
                    type: UserDetail.GET_USER_LIST,
                    payload: data
                })
            })
            .catch(err => {
                console.log(err);
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
                if (data == "USER_ALREADY_REGISTERED") {
                    dispatch({
                        type: UserDetail.DUPLICATE_USER_ERROR,
                        payload: true
                    })
                } else {
                    dispatch({ type: UserDetail.CREATE_NEW_USER, payload: true })
                }
            })
            .catch(err => {
                console.log(err);
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
                console.log(err);
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
                console.log(err);
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

