import React, { Component } from 'react';
import { Button, Col, Alert, Label, Input, Row } from 'reactstrap';
import { connect } from "react-redux";
import { CreateNewUser,updateUser } from '../reducer/userDetail.action';


class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdated: false,
            userDetails: {
                firstName: '',
                lastName: '',
                password: '',
                role: '',
                email: '',
                date: new Date().toJSON().slice(0, 10).replace(/-/g, '/')
            },
            isSubmitted: false
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
       let data={
            firstName: this.state.userDetails.firstName,
            lastName: this.state.userDetails.lastName,
            email: this.state.userDetails.email,
            password: this.state.userDetails.password,
            role: 2,
            isActive: 1, 
            status: 1, 
            createdAt: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
            updatedAt: "null", 
            createdBy: "john",
            updatedBy: "null" 
        }
        this.props.CreateNewUser(data);
    }

    // handleUpdate =() => {
    //     this.setState({
    //         isUpdated: !this.state.isUpdated
    //     })
    //     let data={

    //     }
    //     this.props.updateUser();
    // }

    render() {
        console.log("updated or not", this.state.isUpdated);
        console.log("state", this.props.updatedDetails)
        if (this.props.updatedDetails && !this.state.isUpdated) {
            this.setState({
                userDetails: this.props.updatedDetails,
                isUpdated: true
            })
        }
        return (
            <div>
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> First Name:-  </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input type="text" id="firstName" value={this.state.userDetails.firstName} onChange={this.handleUserChange} placeholder="First Name" />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Last Name:-  </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input type="text" id="lastName" value={this.state.userDetails.lastName} onChange={this.handleUserChange} placeholder="Last Name" />
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
                            <option value="2">Management</option>
                            <option value="3">Internal Employee</option>
                            <option value="4">External Employee</option>
                            <option value="5">Designer</option>
                            <option value="6">Client</option>
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
                        <Input disabled id="email" type="email" value={this.state.userDetails.email} onChange={this.handleUserChange} placeholder="Email" />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                {this.state.isUpdated && <Row style={{ marginTop: 5 }}>
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
                </Row> }
                {this.state.isUpdated ? null : <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="12" md="6" lg="6">
                        <Button  color="success" style={{ float: "right" }} onClick={this.handleSumbit}>Create</Button>
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row> }
                {this.state.isUpdated ? <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="12" md="6" lg="6">
                        <Button disabled={this.state.isUpdated} color="success" style={{ float: "right" }} onClick={this.handleUpdate}>Update</Button>
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row> : null }
                {this.props.isUserCreated &&
                    <Row style={{ marginTop: 5 }}>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                        <Col xs="12" md="6" lg="6">
                            <Alert color="success" style={{ width: "90%" }}>
                                You Have Created New User SuccessFully. Thanks !
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
        updatedDetails: state.userDetail.updatedDetails,
        isUserCreated: state.userDetail.isUserCreated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CreateNewUser: (data) => dispatch(CreateNewUser(data)),
        updateUser : (id) => dispatch(updateUser(id))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
