import { ActiveJobDetail } from './constants.activeJobs';
import { API_ROOT, URI, StringFormat } from '../../../config/config';


export const SelectedJob = (id) => {
  return (dispatch) => {
     dispatch({
        type: ActiveJobDetail.GET_JOB_ID,
        payload: id
    })
}
}



export const GetJobParticipants =(id) => {
    return (dispatch) => {
        fetch ( StringFormat(API_ROOT + URI.GET_JOB_PARTICIPANTS,id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data,"data of api");
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






