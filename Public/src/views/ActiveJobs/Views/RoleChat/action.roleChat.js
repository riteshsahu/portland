import { RoleChatDetail } from './constants.roleChat';
import { API_ROOT, URI, StringFormat } from '../../../../config/config';
import {ProfileDetail} from '../../../../views/Profile/profile.constants';

export const selectedJob = (id,value) => {
  return (dispatch) => {
     dispatch({
        type: RoleChatDetail.GET_JOB_ID,
        payload: id,
        title: value
    })
}
}

export const createNewPrivateChatRoom = (data) => {
    return (dispatch) => {
        fetch(API_ROOT + URI.CREATE_NEW_PRIVATE_CHAT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
               if (data == "CREATED") {
                    dispatch({ 
                        type: RoleChatDetail.CREATE_PRIVATE_CHAT, 
                        payload: true 
                    })
                }
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



export const getJobParticipants = (id) => {
    return (dispatch) => {
        fetch ( StringFormat(API_ROOT + URI.GET_JOB_PARTICIPANTS,id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: RoleChatDetail.GET_JOB_PARTICIPANTS,
                    payload: data
                })
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

export const getRoleChatHistory = (id, role) => {
    return (dispatch) => {
        dispatch({
            type: RoleChatDetail.UPDATE_ROLE,
            payload: role
        })
        // dispatch({
        //     type: RoleChatDetail.GET_ROLE_CHAT_HISTORY,
        //     payload: [],
        //     isChatUpdated: false
        // })
        fetch ( StringFormat(API_ROOT + URI.GET_ROLE_CHAT_HISTORY,id, role), {
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
                    isChatUpdated: true
                });
                // setTimeout(()=>{
                //     dispatch({
                //         type: RoleChatDetail.GET_ROLE_CHAT_HISTORY_UPDATE,
                //         isChatUpdated: false
                //     });
                // },1000)
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

export const getRoleChatDetails = (id) => {
    return (dispatch) => {
        fetch ( StringFormat(API_ROOT + URI.GET_PRIVATE_CHAT_DETAILS, id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                return res.json()})
            
            .then(data => {
                if (data && data[0]) {
                    dispatch({
                        type: RoleChatDetail.GET_PRIVATE_CHAT_DETAILS,
                        payload: data[0]
                    })
                }
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







