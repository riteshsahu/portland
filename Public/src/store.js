import { combineReducers } from 'redux';
import userGroupReducer from './views/UserManagement/UserGroup/reducer/UserGroup.reducer';
import RegisterReducer from './views/Pages/Register/reducer.register';
import LoginReducer from './views/Pages/Login/reducer.login';
import CardToggleReducer from './views/New Business/reducer/reducer.newBusiness';
import userDetailReducer from './views/userDetail/reducer/userDetail.reducer';

const rootReducer = combineReducers({
    UserGroup: userGroupReducer,
    register: RegisterReducer,
    login: LoginReducer,
    ToggleCard:CardToggleReducer,
    userDetail: userDetailReducer
})


export default rootReducer;