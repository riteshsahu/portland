import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Button, Col, Label, Input, Row, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../user.css'
import { connect } from "react-redux";
import { CreateUserHandler } from '../reducer/userDetail.action';
class UserSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Row className="header">

                <Col style={{ display: "flex" }} xs="12" md="10" lg="10">
                {this.props.createUser&&
                 <Label>Create New User</Label>
                }
                    {!this.props.createUser &&
                        <>
                            <Input type="text" placeholder="Role" />
                            <Input type="text" placeholder=" Name" />
                            <Input type="text" placeholder="Email Address " />
                            <Button className="btn btn-info " > <i className="fa fa-search "></i></Button>
                        </>
                    }

                </Col>
                <Col xs="12" md="2" lg="2">

                    {!this.props.createUser &&
                        <Button onClick={this.props.CreateUserHandler} className="btn btn-success " style={{ float: "right", fontSize: "medium" }}>
                            <i style={{ marginRight: 5 }} className="fa fa-plus "></i>
                            Create User
             </Button>}
                    {this.props.createUser &&
                        <Button onClick={this.props.CreateUserHandler} className="btn btn-info " style={{ float: "right", fontSize: "medium" }}>
                            User List
             </Button>}

                </Col>
            </Row>

        )
    }
}

const mapStateToProps = state => {
    return {
        createUser: state.userDetail.createUser,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CreateUserHandler: () => dispatch(CreateUserHandler()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
