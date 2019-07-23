import {CardToggle} from './constants.newBusiness';

const initialState = {
    cardToggle: false
} 

function rootReducer(state = initialState, action) {
   
    switch (action.type) {
        case CardToggle.TOGGLE_CARD:
            return {
                ...state,
                cardToggle: !state.cardToggle
            }
            default:
                return state;
    }

}

export default rootReducer;