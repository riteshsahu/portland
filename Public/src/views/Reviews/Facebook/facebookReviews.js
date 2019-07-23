import React, { Component } from 'react';
import { Card, CardHeader, CardBody, } from 'reactstrap';
import FBReview from '../Reviews/fbReviews';

class FbReview extends Component {
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
                <CardBody>
                    <FBReview />
                </CardBody>
            </Card>
        )
    }
}

export default FbReview; 