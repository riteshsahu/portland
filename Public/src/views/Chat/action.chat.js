import { ChatDetail } from './constants.chat';

export const updateChatDetails = (JobId, jobType) => {
    return (dispatch) => {
        dispatch({
            type: ChatDetail.UPDATE_CHAT_DETAILS,
            payload: {
                JobId: JobId,
                jobType: jobType
            },
        });
    }
}