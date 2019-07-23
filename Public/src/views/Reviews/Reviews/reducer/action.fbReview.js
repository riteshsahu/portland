import { Review } from './constants.fbReview'
import { API_ROOT, URI } from '../../../../../src/config/config';

export const getFbReviews = () => {
    return (dispatch) => {
        fetch(API_ROOT + URI.GET_REVIEWS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                    dispatch({
                        type: Review.GET_REVIEW_DATA,
                        payload: data.data
                    })
                console.log(data.data, "data in api");
            })
            .catch(err => {
                console.log(err);
            })
    }
}