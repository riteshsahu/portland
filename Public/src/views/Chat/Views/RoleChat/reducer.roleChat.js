import { RoleChatDetail } from './constants.roleChat';

const initialState = {
    roleId: '',
    chatHistory: '',
}

function RoleChatReducer(state = initialState, action) {

    switch (action.type) {
        
        case RoleChatDetail.UPDATE_ROLE:
            return {
                ...state,
                roleId: action.payload,
            }

        case RoleChatDetail.GET_ROLE_CHAT_HISTORY:
            return {
                ...state,
                chatHistory: action.payload,
            }

        default:
            return state;

    }
}

export default RoleChatReducer;