
import { UserDetail } from './userDetail.constants';

const initialState = {
    createUser: false,
    isExist: false,
    isUserCreated: false,
    userDeleted: false,
    updatedDetails: {},
    userDetails: {},
    userUpdated: false,
    count: '',
    userSuggestions: ''
}


function UserReducer(state = initialState, action) {

    switch (action.type) {

        case UserDetail.USER_UPDTAED:
            return {
                ...state,
                userUpdated: action.payload
            }

        case UserDetail.UPDATE_USER:
            return {
                ...state,
                updatedDetails: action.payload,
                createUser: true,
            }

        case UserDetail.CREATE_USER:
            return {
                ...state,
                createUser: !state.createUser
            }

        case UserDetail.CREATE_NEW_USER:
            return {
                ...state,
                isUserCreated: action.payload
            }
        case UserDetail.DELETE_USER:
            return {
                ...state,
                userDeleted: action.payload
            }

        case UserDetail.DUPLICATE_USER_ERROR:
            return {
                ...state,
                isExist: action.payload
            }


        case UserDetail.GET_USER_LIST:
            return {
                ...state,
                userDetails: action.payload.result || action.payload,
                count: action.payload.count || action.payload.length
            }

            case UserDetail.USER_SUGGESTIONS:
            return {
                ...state,
                userSuggestions: action.payload,
            }

            
        default:
            return state;

    }
}

export default UserReducer;