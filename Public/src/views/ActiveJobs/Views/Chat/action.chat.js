import { ChatDetail } from './constants.chat';
import { API_ROOT, URI, StringFormat } from '../../../../config/config';
import {ProfileDetail} from '../../../../views/Profile/profile.constants';

export const getChatHistory = (id, userId) => {
    console.log(id, userId);
    
    return (dispatch) => {
        fetch ( StringFormat(API_ROOT + URI.GET_CHAT_HISTORY, id, userId), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                
                dispatch({
                    type: ChatDetail.GET_CHAT_HISTORY,
                    payload: data,
                });
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: ChatDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}