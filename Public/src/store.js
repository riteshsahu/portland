import { combineReducers } from 'redux';
import RegisterReducer from './views/Pages/Register/reducer.register';
import LoginReducer from './views/Pages/Login/reducer.login';
import userDetailReducer from './views/userDetail/userDetail.reducer';
import jobDetailReducer from './views/Jobs/jobs.reducer';
import roleDetailReducer from './views/Roles/role.reducer';
import ProfileReducer from './views/Profile/profile.reducer';
import LayoutReducer from './containers/DefaultLayout/reducer.defaultLayout';
import ActiveJobsReducer from './views/ActiveJobs/reducer.activeJobs';

const rootReducer = combineReducers({
    register: RegisterReducer,
    login: LoginReducer,
    userDetail: userDetailReducer,
    jobDetail: jobDetailReducer,
    roleDetail: roleDetailReducer,
    ProfileDetail: ProfileReducer,
    LayoutDetail: LayoutReducer,
    ActiveJobDetail: ActiveJobsReducer
})


export default rootReducer;