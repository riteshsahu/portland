import { JobDetail } from './jobs.constants'

export const CreateJobHandler = () => {
    return (dispatch) => {
        dispatch({
            type: JobDetail.CREATE_JOB,
        })
    }
}

export const CreateNewJob = (data) => {
    return (dispatch) => {
        dispatch({
            type: JobDetail.CREATE_NEW_JOB,
            payload:data
        })
    }
}

export const deleteJob = (index) => {
    return (dispatch) => {
        dispatch({
            type: JobDetail.DELETE_JOB,
            payload:index
        })
    }
}

export const updateJob = (data) => {
    return (dispatch) => {
        dispatch({
            type: JobDetail.UPDATE_JOB,
            payload:data
        })
    }
}