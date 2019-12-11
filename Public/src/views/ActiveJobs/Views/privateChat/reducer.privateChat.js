import { PrivateChatDetail } from './constants.privateChat';

const initialState = {
    JobId: '',
    privateChatId: '',
    chatName: '',
    ParticipantsDetails: [],
    JobTitle: '',
    chatHistory: '',
    isChatUpdated: false,
    isPrivateChatCreated: false
}


function PrivateChatReducer(state = initialState, action) {

    switch (action.type) {
        
        case PrivateChatDetail.UPDATE_JOB_ID:
            return {
                ...state,
                JobId: action.payload,
            }

            case PrivateChatDetail.CREATE_PRIVATE_CHAT:
            return {
                ...state,
                isPrivateChatCreated: action.payload,
            }  

        case PrivateChatDetail.GET_JOB_ID:
            return {
                ...state,
                JobId: action.payload,
                JobTitle: action.title
            }

        case PrivateChatDetail.GET_JOB_PARTICIPANTS:
            return {
                ...state,
                ParticipantsDetails: action.payload
            }

        case PrivateChatDetail.GET_PRIVATE_CHAT_DETAILS:
            return {
                ...state,
                privateChatId: action.payload.privateChatId,
                chatName: action.payload.chatName,
                JobId: action.payload.jobId
            }

        case PrivateChatDetail.GET_CHAT_HISTORY:
            return {
                ...state,
                chatHistory: action.payload,
                isChatUpdated: action.isChatUpdated
            }
            case PrivateChatDetail.GET_CHAT_HISTORY_UPDATE:
                return {
                    ...state,
                    isChatUpdated: action.isChatUpdated
                }
            

        default:
            return state;

    }
}

export default PrivateChatReducer;