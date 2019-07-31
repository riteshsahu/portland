
import { LayoutDetail } from './constants.defaultLayout';

const initialState = {
    JobDetails : ''
}


function LayoutReducer(state = initialState, action) {

    switch (action.type) {

        case LayoutDetail.GET_JOBS_INFO:
            return {
                ...state,
               JobDetails : action.payload
            }

        default:
            return state;

    }
}

export default LayoutReducer;