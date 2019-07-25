import { JobDetail } from './jobs.constants';

const initialState = {
    createJob: false,
    updatedDetails: {},
    jobDetails: [
        {
            job: "Create New Project",
            create_date: "	2012/01/01",
            create_time: "10:00AM",
            created_by: "Admin",
            status: "pending"
        },
        {
            job: "Create New Assignment",
            create_date: "	2015/09/01",
            create_time: "10:30AM",
            created_by: "Admin",
            status: "pending"
        },
        {
            job: "Create New Task",
            create_date: "	2012/11/01",
            create_time: "12:00AM",
            created_by: "Admin",
            status: "pending"
        },
        {
            job: "Create New Repository",
            create_date: "	2019/01/01",
            create_time: "10:00AM",
            created_by: "Admin",
            status: "pending"
        },
        {
            job: "Create New Email",
            create_date: "	2012/05/01",
            create_time: "01:00AM",
            created_by: "Admin",
            status: "pending"
        },
        {
            job: "Create New Memo",
            create_date: "	2019/05/01",
            create_time: "01:00AM",
            created_by: "Admin",
            status: "pending"
        },
        {
            job: "Create New Note",
            create_date: "	2019/05/01",
            create_time: "01:00AM",
            created_by: "Admin",
            status: "pending"
        },
    ]
}


function JobReducer(state = initialState, action) {

    switch (action.type) {
        case JobDetail.UPDATE_JOB:
            return {
                ...state,
                updatedDetails: action.payload,
                createJob: true
            }

        case JobDetail.CREATE_JOB:
            return {
                ...state,
                createJob: !state.createJob
            }

        case JobDetail.CREATE_NEW_JOB:
            return {
                ...state,
                jobDetails: [...state.jobDetails, action.payload]
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