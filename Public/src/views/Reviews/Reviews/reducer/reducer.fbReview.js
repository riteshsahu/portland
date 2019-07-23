
import {Review} from './constants.fbReview';

const initialState = {
    ReviewData: [],
} 


function rootReducer(state = initialState, action) {
   
    switch (action.type) {

       
        case Review.GET_REVIEW_DATA:
            return {
                ...state,
                ReviewData: action.payload
            }
      
            default:
                return state;
         
    }
}

export default rootReducer;