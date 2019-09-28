import { ActiveJobDetail } from './constants.activeJobs';

const initialState = {
    JobId: '',
    ParticipantsDetails: [],
    JobTitle: '',
    chatHistory: '',
    isChatUpdated: false,
    isPrivateChatCreated: false
}


function ActiveJobReducer(state = initialState, action) {

    switch (action.type) {
        
        case ActiveJobDetail.UPDATE_JOB_ID:
            return {
                ...state,
                JobId: action.payload,
            }

            case ActiveJobDetail.CREATE_PRIVATE_CHAT:
            return {
                ...state,
                isPrivateChatCreated: action.payload,
            }  

        case ActiveJobDetail.GET_JOB_ID:
            return {
                ...state,
                JobId: action.payload,
                JobTitle: action.title
            }

        case ActiveJobDetail.GET_JOB_PARTICIPANTS:
            return {
                ...state,
                ParticipantsDetails: action.payload
            }

        case ActiveJobDetail.GET_CHAT_HISTORY:
            return {
                ...state,
                chatHistory: action.payload,
                isChatUpdated: action.isChatUpdated
            }
            case ActiveJobDetail.GET_CHAT_HISTORY_UPDATE:
                return {
                    ...state,
                    isChatUpdated: action.isChatUpdated
                }
            

        default:
            return state;

    }
}

export default ActiveJobReducer;