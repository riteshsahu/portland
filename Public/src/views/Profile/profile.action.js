import { ProfileDetail } from './profile.constants';
import { API_ROOT, URI, StringFormat } from '../../config/config';





export const updateUserProfile = (id, values) => {
    return (dispatch) => {
        fetch(StringFormat(API_ROOT + URI.UPDATE_USE_PROFILE, id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("userDetails",JSON.stringify(data));
                dispatch({
                    type: ProfileDetail.UPDATE_USER_PROFILE,
                    payload: 2
                })
                setTimeout(()=>{
                    dispatch({
                        type: ProfileDetail.UPDATE_USER_PROFILE,
                        payload: 1
                    })
                },2000)
            })
            .catch(err => {
                dispatch({
                    type: ProfileDetail.ERROR_HANDLER,
                    errorFrom: ProfileDetail.ERROR_FROM,
                    errorName: ProfileDetail.ERROR_NAME
                })
            })
    }
}
