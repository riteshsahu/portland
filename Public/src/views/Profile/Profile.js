import React, { Component } from 'react';
import { Input, Card, Col, Label, Row, Alert } from 'reactstrap';
import { connect } from "react-redux";
import { updateUserProfile } from './profile.action';
import ErrorBoundary from '../../containers/ErrorHandler/errorHandler';
import { stat } from 'fs';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            keyRole: {
                1 : "Admin",
                2 : "Management",
                3 : "Internal Employee",
                4 : "External Employee",
                5 : "Designer",
                6 : "Client"
            },
        }
    }

    componentDidMount = () => {
        const userDetails = localStorage.getItem("userDetails");
        const user = JSON.parse(userDetails);
        this.setState({
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            email: user[0].email,
            role: this.state.keyRole[user[0].role]
        })
    }

    handleChangeFirst = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }

    handleChangeLast = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }

    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    handleSubmit = () => {
        const userDetails = localStorage.getItem("userDetails");
        const user = JSON.parse(userDetails);
        const data = {
            userId: user[0].userId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            isActive: 1, //fix
            updatedBy: user[0].userId,
            role: user[0].role,
            status: user[0].status,
            createAt: user[0].createAt,
            createBy: user[0].createBy
        }

        this.props.updateUserProfile(user[0].userId, data);
    }

    render() {
        return (
            <>
            {this.props.errorFrom === "PROFILE_UPDATE" ?
            <Row>
                <Alert color= "danger">{this.props.errorName}</Alert>
            </Row>
              : null }
                <Row>
                    <Col xs="12" md="2" lg="2">
                    </Col>
                    <Col xs="12" md="2" lg="8">
                        <Card style={{ marginTop: 10 }} >
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
                                                    <Label>Role:-</Label>
                                                </Col>
                                                <Col xs="12" md="6" lg="5">
                                                    <Input type="text"
                                                        placeholder="Role"
                                                        value={this.state.role} readOnly
                                                    />
                                                </Col>
                                                <Col lg="2">
                                                </Col>
                                            </Row>
                                             {(this.props.ProfileUpdated === 2) ?
                                            <Row>
                                                <Col lg="2">
                                                </Col>
                                                <Col xs="12" md="6" lg="8">
                                            <Alert color= "success">Profile Updated Successfully</Alert>
                                                </Col>
                                                <Col lg="2">
                                                </Col>
                                            </Row> : null
                                            }

                                            <Row style={{ paddingTop: 10, paddingBottom: 10 }}>
                                                <Col xs="12" md="12" lg="12" style={{ textAlign: 'center' }}>
                                                    <button type="button" onClick={this.handleSubmit} className="btn btn-lg btn-primary" >Submit</button>
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
        ProfileUpdated: state.ProfileDetail.ProfileUpdated,
        errorName: state.ProfileDetail.errorMessage.errorName,
        errorFrom: state.ProfileDetail.errorMessage.errorFrom
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateUserProfile: (id, value) => dispatch(updateUserProfile(id, value)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

