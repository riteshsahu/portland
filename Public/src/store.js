import { combineReducers } from 'redux';
import userGroupReducer from './views/UserManagement/UserGroup/reducer/UserGroup.reducer';
import RegisterReducer from './views/Pages/Register/reducer.register';
import LoginReducer from './views/Pages/Login/reducer.login';
import CardToggleReducer from './views/New Business/reducer/reducer.newBusiness';
import userDetailReducer from './views/userDetail/reducer/userDetail.reducer';
import jobDetailReducer from './views/Jobs/reducer/jobs.reducer';
import roleDetailReducer from './views/Roles/reducer/role.reducer';
import ProfileReducer from './views/Profile/reducer/profile.reducer';
import LayoutReducer from './containers/DefaultLayout/reducer.defaultLayout';
import ActiveJobsReducer from './views/ActiveJobs/reducer/reducer.activeJobs';

const rootReducer = combineReducers({
    UserGroup: userGroupReducer,
    register: RegisterReducer,
    login: LoginReducer,
    ToggleCard:CardToggleReducer,
    userDetail: userDetailReducer,
    jobDetail: jobDetailReducer,
    roleDetail: roleDetailReducer,
    ProfileDetail: ProfileReducer,
    LayoutDetail: LayoutReducer,
    ActiveJobDetail: ActiveJobsReducer
})


export default rootReducer;