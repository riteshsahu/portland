
import { ProfileDetail } from './profile.constants';

const initialState = {
    ProfileUpdated: 1,
    errorMessage: {
        errorFrom: "",
        errorName: ""
    }
}


function ProfileReducer(state = initialState, action) {

    switch (action.type) {

        case ProfileDetail.UPDATE_USER_PROFILE:
            return {
                ...state,
                ProfileUpdated: action.payload
            }
        case ProfileDetail.ERROR_HANDLER:
            return {
                ...state,
                errorMessage: {
                    errorFrom: action.errorFrom,
                    errorName: action.errorName
                }

            }

        default:
            return state;

    }
}

export default ProfileReducer;