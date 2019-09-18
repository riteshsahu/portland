export const API_ROOT = 'https://portland-web.herokuapp.com/api/';
// export const API_ROOT = 'http://localhost:5000/api/';
 

export const URI = {
    CREATE_USER: 'user',
    GET_USER_BY_SEARCH: 'user',
    GET_USERLIST: 'user/userList',
    DELETE_USER: 'user/{0}',
    LOGIN_USER: 'user/auth',
    UPDATE_USER: 'user/{0}',
    GET_COUNTRY: 'country',
    GET_STATES: 'state',
    ADD_NEWBUSINESS: 'businessForm',
    ADD_BRANCHES: 'businessBranch',
    GET_REVIEWS: 'fbReviewRoutes',
    CREATE_JOB:"job",
    SEARCH_JOBS:"job",
    UPDATE_JOB:"job/{0}",
    DELETE_JOB:"job/{0}",
    GET_ALL_JOBS: "job/{0}",
    GET_USER_JOBS: "job/userJobs/{0}",
    GET_USER_LATEST_JOBS: "job/userRecentJobs/{0}",
    GET_USER_COMPLETED_JOBS: "job/userCompletedJobs/{0}",
    GET_JOB_PARTICIPANTS:"job/userInfo/{0}",
    GET_CHAT_HISTORY: "chat/{0}",
    UPDATE_USER_PROFILE: "user/updateProfile/{0}"
}

export const StringFormat = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i += 1) {
        var reg = new RegExp('\\{' + i + '\\}', 'gm');
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};