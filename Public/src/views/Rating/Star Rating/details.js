import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Row, Input, Button, Col } from 'reactstrap';


class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: "",
            email: "",
            error: ""

        }
    }

    handleNumber = (e) => {
        console.log("state", this.state)
        this.setState({
            number: e.target.value
        })
    }

    handleEmail = (e) => {
        console.log("state", this.state)
        this.setState({
            email: e.target.value
        })
    }

    handleSumbit = () => {
        if (this.state.number || this.state.email) {
            this.setState({
                error: ""
            })
            console.log("state data", this.state)
        }
        else {
            this.setState({
                error: "1"
            })
        }
    }

    render() {
        return (
            <div>
                <Col style={{ marginLeft: "33%" }} xs="12" sm="6" md="4">
                    <Card className="border-primary">
                        <CardHeader>
                            Thankyou For Your Valuable Feedback
                        </CardHeader>
                        <CardBody>
                            <Input type="number" placeholder="Contact Number" onChange={this.handleNumber}></Input>
                            <Input style={{ marginTop: 10 }} type="email" onChange={this.handleEmail} placeholder="Email" ></Input>
                            {this.state.error == "1" ? <span style={{ color: "red" }}>Please Fill Any One of the Above</span> : null}
                            <Row style={{ float: "right", marginRight: 0, marginTop: 10 }}>
                                <Button className=" btn btn-info" onClick={this.handleSumbit}>Submit</Button>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        )
    }
}

export default Details; 