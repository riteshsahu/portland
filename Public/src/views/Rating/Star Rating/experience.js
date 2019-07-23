import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Row, Input, Button, Col } from 'reactstrap';
import Details from './details';


class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        }
    }
    handleOk = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    render() {
        return (
            <>
                {this.state.toggle ? <Details /> :
                    <div >
                        <Col style={{ marginLeft: "33%" }} xs="12" sm="6" md="4">
                            <Card className="border-primary">
                                <CardHeader>
                                    Please Share Your Experience
                        </CardHeader>
                                <CardBody>
                                    <Input type="textarea" style={{ height: 100 }} placeholder="Write Here" ></Input>
                                    <Row style={{ float: "right", marginRight: 0, marginTop: 10 }}>
                                        <Button className=" btn btn-info" onClick={this.handleOk}>OK</Button>
                                    </Row>
                                </CardBody>

                            </Card>
                        </Col>
                    </div>
                }
            </>
        )
    }
}

export default Experience; 