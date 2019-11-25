import React, { Component } from 'react';
import { Button, Col, Alert, Label, Input, Row } from 'reactstrap';
import { connect } from "react-redux";
import { CreateNewUser, updateUserDetails } from '../userDetail.action';


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
            isSubmitted: false,
            roleKey:{
                1 : "Admin",
                2 : "Management",
                3 : "Internal Employee",
                4 : "External Employee",
                5 : "Designer",
                6 : "Client"
            }
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
        const userDetails = localStorage.getItem("userDetails");
        const user = JSON.parse(userDetails);
        this.setState({
            isSubmitted: !this.state.isSubmitted
        })
        let data = {
            firstName: this.state.userDetails.firstName,
            lastName: this.state.userDetails.lastName,
            email: this.state.userDetails.email,
            password: this.state.userDetails.password,
            role: this.state.userDetails.role,
            isActive: 1,
            status: 1,
            userId: user[0].userId
        }

        if (data.firstName !== '' && data.lastName !== '' && data.email !== '' && data.role !== "" && data.password !== "") {
            this.props.CreateNewUser(data);
        }
    }

    handleUpdate = () => {
        this.setState({
            isUpdated: !this.state.isUpdated
        })

        const userDetails = localStorage.getItem("userDetails");
        const user = JSON.parse(userDetails);
        let data = {
            "userId": this.state.userDetails.userId,
            "firstName": this.state.userDetails.firstName,
            "lastName": this.state.userDetails.lastName,
            "email": this.state.userDetails.email,
            "password": this.state.userDetails.password,
            "role": this.state.userDetails.role,
            "isActive": 1, //fix
            "status": this.state.userDetails.status,
            "createAt" : this.state.userDetails.createAt,
            "createBy" : this.state.userDetails.createBy,
            "updatedBy" : user[0].userId
        }

        if (data.firstName !== '' && data.lastName !== '' && data.email !== '') {
            this.props.updateUserDetails(this.state.userDetails.userId, data);
        }
    }

    render() {
   
        if (this.props.updatedDetails.email && !this.state.isUpdated) {
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
                        <Input id="role" type="select"  onChange={this.handleUserChange}>
                            <option value="" selected disabled>Select a role</option>
                            <option value="2" selected={this.state.userDetails.role === 2 ? true: false } >Management</option>
                            <option value="3" selected={this.state.userDetails.role === 3 ? true: false } >Internal Employee</option>
                            <option value="4" selected={this.state.userDetails.role === 4 ? true: false } >External Employee</option>
                            <option value="5" selected={this.state.userDetails.role === 5 ? true: false } >Designer</option>
                            <option value="6" selected={this.state.userDetails.role === 6 ? true: false } >Client</option>
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
                        <Input disabled={this.state.isUpdated} id="email" type="email" value={this.state.userDetails.email} onChange={this.handleUserChange} placeholder="Email" />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                {!this.state.isUpdated && <Row style={{ marginTop: 5 }}>
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
                </Row>}
                {this.state.isUpdated ? null :
                    <Row style={{ marginTop: 5 }}>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                        <Col xs="12" md="6" lg="6">
                            <Button style={{ float: "right" ,background: "#ff8f00", color: "white"}} onClick={e=>{this.handleSumbit()}}>Create</Button>
                        </Col>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                    </Row>
                }

                {this.state.isUpdated ? <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="12" md="6" lg="6">
                        <Button disabled={!this.state.isUpdated} color="success" style={{ float: "right" }} onClick={e=>{this.handleUpdate()}}>Update</Button>
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row> : null}

                {this.props.userUpdated &&
                    <Row style={{ marginTop: 5 }}>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                        <Col xs="12" md="6" lg="6">
                            <Alert color="success" style={{ width: "90%" }}>
                               Details Updated SuccessFully. Thanks !
                            </Alert>
                        </Col>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                    </Row>}
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
        isUserCreated: state.userDetail.isUserCreated,
        userUpdated: state.userDetail.userUpdated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CreateNewUser: (data) => dispatch(CreateNewUser(data)),
        updateUserDetails: (id, data) => dispatch(updateUserDetails(id,data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
