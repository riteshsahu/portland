import React, { Component } from 'react';
import Review from '../Reviews/reviews';
import { CardBody, Col, Row, } from 'reactstrap';

class ReviewList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <CardBody>
                <Row>
                    <Col xs="12" sm="6" md="4">
                        <Review />
                    </Col>
                    <Col xs="12" sm="6" md="4">
                        <Review />
                    </Col>
                     <Col xs="12" sm="6" md="4">
                        <Review />
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" sm="6" md="4">
                        <Review />
                    </Col>
                    <Col xs="12" sm="6" md="4">
                        <Review />
                    </Col>
                     <Col xs="12" sm="6" md="4">
                        <Review />
                    </Col>
                </Row>
                
            </CardBody>
        )
    }
}

export default ReviewList; 