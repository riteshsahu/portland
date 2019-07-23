import React, { Component } from 'react';
import { Card, CardHeader, } from 'reactstrap';
import ReviewList from '../ReviewList/reviewList';

class TripAdvisorReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Card>
                <CardHeader className="header" >
                    Reviews
                    </CardHeader>
                <ReviewList />
            </Card>
        )
    }
}

export default TripAdvisorReview; 