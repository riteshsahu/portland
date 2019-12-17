import { ActiveJobDetail } from './constants.activeJobs';

const initialState = {
    JobId: '',
    ParticipantsDetails: [],
    JobTitle: '',
    isChatUpdated: false,
    isPrivateChatCreated: false,
    privateChatData: [],
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

        case ActiveJobDetail.GET_JOB_DETAILS:
            return {
                ...state,
                JobId: action.payload.jobId,
                JobTitle: action.payload.jobTitle
            }

        case ActiveJobDetail.GET_JOB_PARTICIPANTS:
            return {
                ...state,
                ParticipantsDetails: action.payload
            }

        case ActiveJobDetail.GET_PRIVATE_CHAT_DATA:
            return {
                ...state,
                privateChatData: action.payload
            }
            
        default:
            return state;

    }
}

export default ActiveJobReducer;