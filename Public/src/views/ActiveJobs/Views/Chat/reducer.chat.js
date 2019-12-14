import { ChatDetail } from './constants.chat';

const initialState = {
    chatHistory: '',
}

function ChatReducer(state = initialState, action) {

    switch (action.type) {

        case ChatDetail.GET_CHAT_HISTORY:
            return {
                ...state,
                chatHistory: action.payload,
                isChatUpdated: action.isChatUpdated
            }
            
        default:
            return state;

    }
}

export default ChatReducer;