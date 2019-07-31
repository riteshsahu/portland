
import { ProfileDetail } from './profile.constants';

const initialState = {
    ProfileUpdated: ''
}


function ProfileReducer(state = initialState, action) {

    switch (action.type) {

        case ProfileDetail.UPDATE_USER_PROFILE:
            return {
                ...state,
                ProfileUpdated: action.payload
            }

        default:
            return state;

    }
}

export default ProfileReducer;