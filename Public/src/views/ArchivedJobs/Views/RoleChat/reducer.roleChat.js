import { RoleChatDetail } from './constants.roleChat';

const initialState = {
    roleChatId: '',
    roleTab: '',
    ParticipantsDetails: [],
    chatHistory: '',
    isChatUpdated: false,
    isPrivateChatCreated: false
}


function RoleChatReducer(state = initialState, action) {

    switch (action.type) {
        
        case RoleChatDetail.UPDATE_ROLE_TAB:
            return {
                ...state,
                roleTab: action.payload,
            }

        // case RoleChatDetail.GET_JOB_ID:
        //     return {
        //         ...state,
        //         JobId: action.payload,
        //         JobTitle: action.title
        //     }

        case RoleChatDetail.GET_JOB_PARTICIPANTS:
            return {
                ...state,
                ParticipantsDetails: action.payload
            }

        case RoleChatDetail.GET_ROLE_CHAT_HISTORY:
            return {
                ...state,
                chatHistory: action.payload,
                isChatUpdated: action.isChatUpdated
            }
            case RoleChatDetail.GET_ROLE_CHAT_HISTORY_UPDATE:
                return {
                    ...state,
                    isChatUpdated: action.isChatUpdated
                }
            

        default:
            return state;

    }
}

export default RoleChatReducer;