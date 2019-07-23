import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, Col,Alert, Label, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from "react-redux";
import { CreateNewUser } from '../reducer/userDetail.action';


class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {
                userName: '',
                password: '',
                role: '',
                email: '',
                date: new Date().toJSON().slice(0, 10).replace(/-/g, '/')
            },
            isSubmitted: false
        }
    }

    componentWillReceiveProps=()=>{
        if(this.props.updatedDetails){
                this.setState({
                    userDetails: this.props.updatedDetails
                })
        }
    }

    handleUserChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        let temp = this.state.userDetails;
        temp[id] = value;
        this.setState({
            userDetails: temp
        })
    }
    handleSumbit = () => {
        this.setState({
            isSubmitted: !this.state.isSubmitted
        })
        this.props.CreateNewUser(this.state.userDetails);
    }
    render() {
        return (
            <div>


                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Name:-  </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input type="text" id="userName"value={this.state.userDetail.userName} onChange={this.handleUserChange} placeholder="Name" />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Role:- </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input id="role" type="select" onChange={this.handleUserChange}>
                            <option value="Management">Management</option>
                            <option value="Internal Employee">Internal Employee</option>
                            <option value="External Employee">External Employee</option>
                            <option value="Designer">Designer</option>
                            <option value="Client">Client</option>
                        </Input>
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Email:- </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input id="email" type="email" onChange={this.handleUserChange} placeholder="Email" />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Password:- </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input id="password" type="password" onChange={this.handleUserChange} placeholder="Password" />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="12" md="6" lg="6">
                        <Button disabled={this.state.isSubmitted} color="success" style={{ float: "right" }} onClick={this.handleSumbit}>Create</Button>
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                {this.state.isSubmitted &&
                    <Row style={{ marginTop: 5 }}>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                        <Col xs="12" md="6" lg="6">
                            <Alert color="success" style={{ width: "90%" }}>
                                Information Submited SuccessFully. Thanks !
                     </Alert>
                        </Col>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                    </Row>}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        updatedDetails:state.userDetail.updatedDetails
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CreateNewUser: (data) => dispatch(CreateNewUser(data)),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
