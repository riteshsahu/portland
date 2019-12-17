import { combineReducers } from 'redux';
import RegisterReducer from './views/Pages/Register/reducer.register';
import LoginReducer from './views/Pages/Login/reducer.login';
import userDetailReducer from './views/userDetail/userDetail.reducer';
import jobDetailReducer from './views/Jobs/jobs.reducer';
import roleDetailReducer from './views/Roles/role.reducer';
import ProfileReducer from './views/Profile/profile.reducer';
import LayoutReducer from './containers/DefaultLayout/reducer.defaultLayout';
import ActiveJobsReducer from './views/ActiveJobs/reducer.activeJobs';
import ChatReducer from './views/Chat/reducer.chat';
import RoleChatReducer from './views/Chat/Views/RoleChat/reducer.roleChat';
import PrivateChatReducer from './views/Chat/Views/PrivateChat/reducer.privateChat';

const rootReducer = combineReducers({
    register: RegisterReducer,
    login: LoginReducer,
    userDetail: userDetailReducer,
    jobDetail: jobDetailReducer,
    roleDetail: roleDetailReducer,
    ProfileDetail: ProfileReducer,
    LayoutDetail: LayoutReducer,
    ChatDetail: ChatReducer,
    ActiveJobDetail: ActiveJobsReducer,
    RoleChatDetail: RoleChatReducer,
    PrivateChatDetail: PrivateChatReducer
})


export default rootReducer;