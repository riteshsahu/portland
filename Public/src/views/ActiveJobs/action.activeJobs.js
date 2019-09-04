import { ActiveJobDetail } from './constants.activeJobs';
import { API_ROOT, URI, StringFormat } from '../../config/config';


export const SelectedJob = (id,value) => {
  return (dispatch) => {
     dispatch({
        type: ActiveJobDetail.GET_JOB_ID,
        payload: id,
        title: value
    })
}
}



export const GetJobParticipants = (id) => {
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
                console.log(err);
            })
    }
}

export const GetChatHistory = (id) => {
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
                // console.log(data,"data of api");
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
                console.log(err);
            })
    }
}







