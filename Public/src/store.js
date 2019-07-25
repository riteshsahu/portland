import { combineReducers } from 'redux';
import userGroupReducer from './views/UserManagement/UserGroup/reducer/UserGroup.reducer';
import RegisterReducer from './views/Pages/Register/reducer.register';
import LoginReducer from './views/Pages/Login/reducer.login';
import CardToggleReducer from './views/New Business/reducer/reducer.newBusiness';
import FbReviewsReducer from './views/Reviews/Reviews/reducer/reducer.fbReview';
import userDetailReducer from './views/userDetail/reducer/userDetail.reducer';
import jobDetailReducer from './views/Jobs/reducer/jobs.reducer';
import roleDetailReducer from './views/Roles/reducer/role.reducer';

const rootReducer = combineReducers({
    UserGroup: userGroupReducer,
    register: RegisterReducer,
    login: LoginReducer,
    ToggleCard:CardToggleReducer,
    FbReviews: FbReviewsReducer,
    userDetail: userDetailReducer,
    jobDetail: jobDetailReducer,
    roleDetail: roleDetailReducer
})


export default rootReducer;