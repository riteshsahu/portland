import { JobDetail } from './jobs.constants'
import { API_ROOT, URI, StringFormat } from '../../config/config';

export const getAllJob=(id)=>{
    console.log("---id----",id);
    return (dispatch) => {
        fetch(StringFormat(API_ROOT + URI.GET_ALL_JOBS, id), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("-job-All-search list---", data)
                dispatch({
                    type: JobDetail.JOB_LIST,
                    payload: data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const getSearchOFF = () => {
    return (dispatch) => {
        dispatch({
            type: JobDetail.GET_SEARCH,
            payload: false
        })
    }
}


export const deleteUserJob = (id) => {
    return (dispatch) => {
        fetch(StringFormat(API_ROOT + URI.DELETE_JOB, id), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('---job delete from database---', data);
                dispatch({
                    type: JobDetail.GET_SEARCH,
                    payload: true
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const updateJobDetails = (id, value) => {
    return (dispatch) => {
        fetch(StringFormat(API_ROOT + URI.UPDATE_JOB, id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        })
            .then(res => res.json())
            .then(data => {
                console.log('---job updated---', data);
                dispatch({
                    type: JobDetail.JOB_UPDATED,
                    payload: true
                });
                setTimeout(() => {
                    dispatch({
                        type: JobDetail.JOB_UPDATED,
                        payload: false
                    });
                    dispatch({
                        type: JobDetail.CREATE_JOB
                    });
                }, 1500)

            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const searchJobs = (data) => {
    console.log('dadaaa--------------', data);
    let qq = API_ROOT.concat(`${URI.SEARCH_JOBS}?jobId=${data.jobId}&jobStatus=${data.jobStatus}&jobCreatedBy=${data.jobCreatedBy}`);
    console.log('query-----', qq)
    return (dispatch) => {
        fetch(qq, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("-job--search list---", data)
                dispatch({
                    type: JobDetail.JOB_LIST,
                    payload: data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}


export const CreateJobHandler = () => {
    return (dispatch) => {
        dispatch({
            type: JobDetail.CREATE_JOB,
        })
    }
}

export const CreateNewJob = (value) => {
    return (dispatch) => {
        fetch(API_ROOT + URI.CREATE_JOB, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: JobDetail.JOB_CREATE_COMPLETED,
                    payload: true
                })
                console.log("----job created----",data);
                setTimeout(() => {
                    dispatch({
                        type: JobDetail.JOB_CREATE_COMPLETED,
                        payload: false
                    })
                    dispatch({
                        type: JobDetail.CREATE_NEW_JOB,
                        payload: false
                    })
                }, 2000)
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const deleteJob = (index) => {
    return (dispatch) => {
        dispatch({
            type: JobDetail.DELETE_JOB,
            payload: index
        })
    }
}

export const updateJob = (data) => {
    return (dispatch) => {
        dispatch({
            type: JobDetail.UPDATE_JOB,
            payload: data
        })
    }
}