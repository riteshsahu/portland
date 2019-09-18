
import { LayoutDetail } from './constants.defaultLayout';

const initialState = {
    JobDetails: '',
    DeletedJobDetails: '',
    RecentJobDetails: ''
}


function LayoutReducer(state = initialState, action) {

    switch (action.type) {

        case LayoutDetail.GET_JOBS_INFO:
            return {
                ...state,
                JobDetails: action.payload
            }

        case LayoutDetail.GET_COMPLETED_JOBS_INFO:
            return {
                ...state,
                DeletedJobDetails: action.payload
            }
            
        case LayoutDetail.GET_LATEST_JOBS_INFO:
            return {
                ...state,
                RecentJobDetails: action.payload
            }

        default:
            return state;

    }
}

export default LayoutReducer;