
import { LayoutDetail } from './constants.defaultLayout';

const initialState = {
    jobDetails: '',
    deletedJobDetails: '',
}


function LayoutReducer(state = initialState, action) {

    switch (action.type) {

        case LayoutDetail.GET_JOBS_INFO:
            return {
                ...state,
                jobDetails: action.payload
            }

        case LayoutDetail.GET_COMPLETED_JOBS_INFO:
            return {
                ...state,
                deletedJobDetails: action.payload
            }
            
        default:
            return state;

    }
}

export default LayoutReducer;