export const API_ROOT = 'http://localhost:5000/api/';


export const URI = {
    CREATE_USER: 'user',
    GET_USERLIST: 'user/userList',
    DELETE_USER: 'user/{0}',
    LOGIN_USER: 'user/auth',
    UPDATE_USER: 'user/{0}',
    GET_COUNTRY: 'country',
    GET_STATES: 'state',
    ADD_NEWBUSINESS: 'businessForm',
    ADD_BRANCHES: 'businessBranch',
    GET_REVIEWS: 'fbReviewRoutes'
}

export const StringFormat = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i += 1) {
        var reg = new RegExp('\\{' + i + '\\}', 'gm');
        s = s.replace(reg, arguments[i + 1]);
    }
    console.log(arguments);
    console.log("string format ,,, ",s)
    return s;
};