import React, { Component } from 'react';
import { Badge, Input, Card, Modal, ModalBody, ModalFooter, Button, Col, Pagination, Label, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import {updateUserProfile} from './profile.action';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            oldPassword: '',
            NewPassword: ''
        }
    }

    componentDidMount=() => {
        const userDetails = localStorage.getItem("userDetails");
        const user= JSON.parse(userDetails) ;
        console.log(user);
        this.setState({
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            email: user[0].email
        })
    }

    handleChangeFirst=(e) => {
        this.setState({
            firstName: e.target.value
        })
    }

    handleChangeLast=(e) => {
        this.setState({
            lastName: e.target.value
        })
    }

    handleChangeEmail=(e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleChangeOldPassword=(e) => {
        this.setState({
            oldPassword: e.target.value
        })
    }
    handleChangeNewPassword=(e) => {
        this.setState({
            NewPassword: e.target.value
        })
    }

    handleSubmit=() => {
        this.props.updateUserProfile(this.state);
    }

    render() {
    
        console.log(this.state);
        return (
            <>
                <Row>
                    <Col xs="12" md="2" lg="2">
                    </Col>
                    <Col xs="12" md="2" lg="8">
                        <Card style={{marginTop: 10}} >
                            <Col>
                                <Row  >
                                    <Col xs="12" md="12" lg="12" >
                                        <form onSubmit={this.handleSubmit}>
                                            <Row style={{ paddingTop: 10, paddingBottom: 10 }} >
                                                <Col lg="2">
                                                </Col>
                                                <Col xs="12" md="6" lg="3">
                                                    <Label>First Name:-</Label>
                                                </Col>
                                                <Col xs="12" md="6" lg="5">
                                                    <Input type="text"
                                                        onChange={this.handleChangeFirst}
                                                        placeholder="First Name"
                                                    value={this.state.firstName} 
                                                    />
                                                </Col>
                                                <Col lg="2">
                                                </Col>
                                            </Row>


                                            <Row style={{ paddingTop: 10, paddingBottom: 10 }} >
                                                <Col lg="2">
                                                </Col>
                                                <Col xs="12" md="6" lg="3">
                                                    <Label>Last Name:-</Label>
                                                </Col>
                                                <Col xs="12" md="6" lg="5">
                                                    <Input type="text"
                                                        onChange={this.handleChangeLast}
                                                        placeholder="Last Name"
                                                    value={this.state.lastName}
                                                    />
                                                </Col>
                                                <Col lg="2">
                                                </Col>
                                            </Row>

                                            <Row style={{ paddingTop: 10, paddingBottom: 10 }} >
                                                <Col lg="2">
                                                </Col>
                                                <Col xs="12" md="6" lg="3">
                                                    <Label>Email:-</Label>
                                                </Col>
                                                <Col xs="12" md="6" lg="5">
                                                    <Input type="text"
                                                        onChange={this.handleChangeEmail}
                                                        placeholder="jane.doe@gmail.com"
                                                    value={this.state.email} readOnly
                                                    />
                                                </Col>
                                                <Col lg="2">
                                                </Col>
                                            </Row>

                                            <Row style={{ paddingTop: 10, paddingBottom: 10 }} >
                                                <Col lg="2">
                                                </Col>
                                                <Col xs="12" md="6" lg="3">
                                                    <Label>Old Password:-</Label>
                                                </Col>
                                                <Col xs="12" md="6" lg="5">
                                                    <Input type="password"
                                                        onChange={this.handleChangeOldPassword}
                                                        placeholder="Old Password"
                                                    />
                                                </Col>
                                                <Col lg="2">
                                                </Col>
                                            </Row>

                                            <Row style={{ paddingTop: 10, paddingBottom: 10 }} >
                                                <Col lg="2">
                                                </Col>
                                                <Col xs="12" md="6" lg="3">
                                                    <Label>New Password:-</Label>
                                                </Col>
                                                <Col xs="12" md="6" lg="5">
                                                    <Input type="password" 
                                                        onChange={this.handleChangeNewPassword}
                                                        placeholder="New Password"
                                                    />
                                                </Col>
                                                <Col lg="2">
                                                </Col>
                                            </Row>

                                            <Row style={{ paddingTop: 10, paddingBottom: 10 }}>
                                                <Col xs="12" md="12" lg="12" style={{ textAlign: 'center' }}>
                                                    <button type="submit" onClick={this.handleSubmit} className="btn btn-lg btn-primary" >Submit</button>
                                                </Col>
                                            </Row>
                                        </form>
                                    </Col>
                                </Row>
                            </Col>
                        </Card>
                    </Col>
                    <Col xs="12" md="2" lg="2">
                    </Col>
                </Row>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
       ProfileUpdated: state.ProfileDetail.ProfileUpdated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateUserProfile: (value) => dispatch(updateUserProfile(value)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

