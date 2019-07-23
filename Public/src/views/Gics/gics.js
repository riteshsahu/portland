import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, } from 'reactstrap';

class Gics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            togleButton: true,
            discription: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
            laoreet dolore magna aliquam Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
            laoreet dolore magna aliquam.`,
        }
    }

    togleSeeMore = () => {
        this.setState({
            togleButton: false
        })
    }

    togleSeeLess = () => {
        this.setState({
            togleButton: true
        })
    }
    render() {
        let result;
        result = this.state.discription.length
        return (
            <div>
                <Card>
                    <CardHeader className="header" >
                        GICS
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Col xs="12" sm="6" md="4">
                                <Card className="border-primary">
                                    <CardHeader>
                                        American Express
                                        </CardHeader>
                                    <CardBody>
                                        G-101
                                        </CardBody>
                                    <CardBody>
                                        {this.state.discription.length > 170 && this.state.togleButton ? (
                                            <div >
                                                {this.state.discription.substr(0, 170)}
                                                <a href="javascript:void(0)" onClick={this.togleSeeMore}>...see more</a>
                                            </div>) :
                                            <div>
                                                {this.state.discription}
                                                <a href="javascript:void(0)" onClick={this.togleSeeLess}>...see less</a>
                                            </div>
                                        }
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xs="12" sm="6" md="4">
                                <Card className="border-primary">
                                    <CardHeader>
                                        Royal Bank of Canada (RBC)
                                     </CardHeader>
                                    <CardBody>
                                        G-102
                                    </CardBody>
                                    <CardBody>
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                                        laoreet dolore magna aliquam Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                                        laoreet dolore magna aliquam.
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xs="12" sm="6" md="4">
                                <Card className="border-primary">
                                    <CardHeader>
                                        Canadian Imperial Bank of Commerce
                                    </CardHeader>
                                    <CardBody>
                                        G-103
                                    </CardBody>
                                    <CardBody>
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                                        laoreet dolore magna aliquam Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                                        laoreet dolore magna aliquam.
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs="12" sm="6" md="4">
                                <Card className="border-primary">
                                    <CardHeader>
                                        Citi Bank
                                    </CardHeader>
                                    <CardBody>
                                        G-104
                                    </CardBody>
                                    <CardBody>
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                                        laoreet dolore magna aliquam Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                                        laoreet dolore magna aliquam.
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xs="12" sm="6" md="4">
                                <Card className="border-primary">
                                    <CardHeader>
                                        HDFC Bank
                                    </CardHeader>
                                    <CardBody>
                                        G-105
                                    </CardBody>
                                    <CardBody>
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                                        laoreet dolore magna aliquam Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                                        laoreet dolore magna aliquam.
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col xs="12" sm="6" md="4">
                                <Card className="border-primary">
                                    <CardHeader>
                                        Bank of America
                                    </CardHeader>
                                    <CardBody>
                                        G-106
                                    </CardBody>
                                    <CardBody>
                                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                                        laoreet dolore magna aliquam Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                                        laoreet dolore magna aliquam.
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }

}

export default Gics; 