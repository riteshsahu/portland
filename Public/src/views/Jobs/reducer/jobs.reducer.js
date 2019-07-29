import { JobDetail } from './jobs.constants';

const initialState = {
    createJob: false,
    updatedDetails: {},
    jobCreated: false,
    jobDetails: [],
    jobUpdated: false,
    saerchPermission: false,
    jobCreateCompleted: false
}


function JobReducer(state = initialState, action) {

    switch (action.type) {

        case JobDetail.JOB_CREATE_COMPLETED: 
            return{
                ...state,
                jobCreateCompleted: action.payload
            }

        case JobDetail.GET_SEARCH:
                return {
                    ...state,
                    saerchPermission: action.payload
                }

        case JobDetail.JOB_UPDATED: 
            return{
                ...state,
                jobUpdated: action.payload
            }

        case JobDetail.UPDATE_JOB:
            return {
                ...state,
                updatedDetails: action.payload,
                createJob: true
            }

            case JobDetail.JOB_LIST:
                    return{
                        ...state,
                        jobDetails: action.payload
                    }

        case JobDetail.CREATE_JOB:
            return {
                ...state,
                createJob: !state.createJob,
                updatedDetails:{}
            }

        case JobDetail.CREATE_NEW_JOB:
            return {
                ...state,
                // jobDetails: [...state.jobDetails, action.payload]
                createJob: action.payload
            }

        case JobDetail.DELETE_JOB:
            var updatedJobs = state.jobDetails.filter((data, index) => {
                return (action.payload != index)
            });
            return {
                ...state,
                jobDetails: updatedJobs
            }
        default:
            return state;
    }
}

export default JobReducer;