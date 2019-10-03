import { ActiveJobDetail } from './constants.activeJobs';
import { API_ROOT, URI, StringFormat } from '../../config/config';
import {ProfileDetail} from '../../views/Profile/profile.constants';

export const selectedJob = (id,value) => {
  return (dispatch) => {
     dispatch({
        type: ActiveJobDetail.GET_JOB_ID,
        payload: id,
        title: value
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
                    type: ActiveJobDetail.GET_JOB_PARTICIPANTS,
                    payload: data
                })
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: ActiveJobDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}

export const getChatHistory = (id) => {
    return (dispatch) => {
        dispatch({
            type: ActiveJobDetail.UPDATE_JOB_ID,
            payload: id
        })
        dispatch({
            type: ActiveJobDetail.GET_CHAT_HISTORY,
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
                    type: ActiveJobDetail.GET_CHAT_HISTORY,
                    payload: data,
                    isChatUpdated: true
                });
                setTimeout(()=>{
                    dispatch({
                        type: ActiveJobDetail.GET_CHAT_HISTORY_UPDATE,
                        isChatUpdated: false
                    });
                },1000)
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: ActiveJobDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}







