import {CardToggle} from './constants.newBusiness';

export const handleCard = () => {
    return (dispatch) => {
        dispatch({
            type:CardToggle.TOGGLE_CARD
        })
    }
}