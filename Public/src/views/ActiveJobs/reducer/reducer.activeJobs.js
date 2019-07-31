import { ActiveJobDetail } from './constants.activeJobs';

const initialState = {
    JobId: '',
    ParticipantsDetails: []
}


function ActiveJobReducer(state = initialState, action) {

    switch (action.type) {

        case ActiveJobDetail.GET_JOB_ID:
            return {
                ...state,
                JobId: action.payload
            }

            case ActiveJobDetail.GET_JOB_PARTICIPANTS:
                return {
                    ...state,
                    ParticipantsDetails: action.payload
                }
        default:
            return state;

    }
}

    export default ActiveJobReducer;