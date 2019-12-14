import { RoleChatDetail } from './constants.roleChat';
import { API_ROOT, URI, StringFormat } from '../../../../../../config/config';
import {ProfileDetail} from '../../../../../Profile/profile.constants';

export const getRoleChatHistory = (id, userId, role) => {
    return (dispatch) => {
        dispatch({
            type: RoleChatDetail.UPDATE_ROLE,
            payload: role
        })
        fetch ( StringFormat(API_ROOT + URI.GET_ROLE_CHAT_HISTORY,id, userId, role), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: RoleChatDetail.GET_ROLE_CHAT_HISTORY,
                    payload: data,
                });
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: RoleChatDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}






