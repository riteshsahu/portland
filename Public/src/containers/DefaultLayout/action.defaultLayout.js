import { LayoutDetail } from './constants.defaultLayout';
import { API_ROOT, URI, StringFormat } from '../../config/config';
import {ProfileDetail} from '../../views/Profile/profile.constants';

export const getUserJobs = (id) => {
    return (dispatch) => {
        fetch ( StringFormat(API_ROOT + URI.GET_USER_JOBS,id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: LayoutDetail.GET_JOBS_INFO,
                    payload: data
                })
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: LayoutDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}




export const getUserCompletedJobs = (id) => {
    return (dispatch) => {
        fetch ( StringFormat(API_ROOT + URI.GET_USER_COMPLETED_JOBS,id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: LayoutDetail.GET_COMPLETED_JOBS_INFO,
                    payload: data
                })
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: LayoutDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}






