import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import  BusinessId from './BusinessID/businessID';
import StarRating from './Star Rating/starRating';

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Card>
            <CardHeader className="header" >
                Rating
            </CardHeader>
                <BusinessId/>
            <CardBody>
                <StarRating/>
            </CardBody>
        </Card>
        )
    }
}

export default Rating; 