import { PrivateChatDetail } from './constants.privateChat';
import { API_ROOT, URI, StringFormat } from '../../../../config/config';
import {ProfileDetail} from '../../../../views/Profile/profile.constants';

export const selectedJob = (id,value) => {
  return (dispatch) => {
     dispatch({
        type: PrivateChatDetail.GET_JOB_ID,
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
                        type: PrivateChatDetail.CREATE_PRIVATE_CHAT, 
                        payload: true 
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: PrivateChatDetail.ERROR_FROM,
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
                    type: PrivateChatDetail.GET_JOB_PARTICIPANTS,
                    payload: data
                })
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: PrivateChatDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}

export const getChatHistory = (id) => {
    return (dispatch) => {
        dispatch({
            type: PrivateChatDetail.UPDATE_JOB_ID,
            payload: id
        })
        dispatch({
            type: PrivateChatDetail.GET_CHAT_HISTORY,
            payload: [],
            isChatUpdated: false
        })
        fetch ( StringFormat(API_ROOT + URI.GET_CHAT_HISTORY,id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: PrivateChatDetail.GET_CHAT_HISTORY,
                    payload: data,
                    isChatUpdated: true
                });
                setTimeout(()=>{
                    dispatch({
                        type: PrivateChatDetail.GET_CHAT_HISTORY_UPDATE,
                        isChatUpdated: false
                    });
                },1000)
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: PrivateChatDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}

export const getPrivateChatDetails = (id) => {
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
                        type: PrivateChatDetail.GET_PRIVATE_CHAT_DETAILS,
                        payload: data[0]
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: PrivateChatDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}







