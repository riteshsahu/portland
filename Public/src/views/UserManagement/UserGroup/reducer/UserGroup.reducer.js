
import { UserGroup } from './UserGroup.constants';



const initialState = {
    openTab: 1
}

function userGroupReducer(state = initialState, action) {
    var errors = {};
    switch (action.type) {
        case UserGroup.ADD_NEW_GROUP:
            return {
                ...state,
                openTab: action.payload
            }

        case UserGroup.SHOW_LIST:
            return {
                ...state,
                openTab: action.payload
            }
        default:
            return state;
    }

};


export default userGroupReducer;