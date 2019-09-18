import { LayoutDetail } from './constants.defaultLayout';
import { API_ROOT, URI, StringFormat } from '../../config/config';

export const GetUserJobs = (id) => {
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
                console.log(err);
            })
    }
}

export const GetUserLatestJobs = (id) => {
    return (dispatch) => {
        fetch ( StringFormat(API_ROOT + URI.GET_USER_LATEST_JOBS,id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: LayoutDetail.GET_LATEST_JOBS_INFO,
                    payload: data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}


export const GetUserCompletedJobs = (id) => {
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
                console.log(err);
            })
    }
}






