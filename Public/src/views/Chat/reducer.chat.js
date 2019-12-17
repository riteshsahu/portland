import { ChatDetail } from './constants.chat';

const initialState = {
    JobId: '',
    KeyRole: {
        1: "Admin",
        2: "Management",
        3: "Internal Employee",
        4: "External Employee",
        5: "Designer",
        6: "Client"
    },
    jobType: 'active'
}

function ChatReducer(state = initialState, action) {

    switch (action.type) {

        case ChatDetail.UPDATE_CHAT_DETAILS:
            return {
                ...state,
                JobId: action.payload.JobId,
                jobType: action.payload.jobType
            }
            
        default:
            return state;

    }
}

export default ChatReducer;