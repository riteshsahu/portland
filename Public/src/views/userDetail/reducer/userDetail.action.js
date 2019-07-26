import { UserDetail } from './userDetail.constants'
// import { API_ROOT, URI } from '../../../../../server/config';

export const CreateUserHandler = () => {
    return (dispatch) => {

        dispatch({
            type: UserDetail.CREATE_USER,
          
        })
    }
}


// export const CreateNewUser = (values) => {
//     return (dispatch) => {
//         fetch(API_ROOT + URI., {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(values)
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data == "USER_ALREADY_REGISTERED") {
//                     dispatch({
//                         type: Register.DUPLICATE_ERROR,
//                         payload: data
//                     })
//                 } else {
//                     dispatch({ type: Register.USER_REGISTERED })
//                 }

//                 console.log(data, "data in api");
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
// }

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