import { ProfileDetail } from './profile.constants';
import { API_ROOT, URI, StringFormat } from '../../../config/config';





export const updateUserProfile = (id, values) => {
    return (dispatch) => {
        fetch(StringFormat(API_ROOT + URI. UPDATE_USER_PROFILE, id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: ProfileDetail. UPDATE_USER_PROFILE,
                    payload: data
                })
                setTimeout(()=>{
                    dispatch({
                        type: ProfileDetail.USER_UPDTAED,
                        payload: false
                    })
                },1500)
            })
            .catch(err => {
                console.log(err);
            })
    }
}
