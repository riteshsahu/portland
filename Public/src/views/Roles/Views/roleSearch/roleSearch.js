import React, { Component } from 'react';
import { Button, Col, Label, Input, Row } from 'reactstrap';
import { connect } from "react-redux";
import { AssignRoleHandler } from '../../role.action';

class RoleSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Row>
                <Col style={{ display: "flex" }} xs="12" md="10" lg="10">
                    {this.props.assignRole &&
                        <Label style={{ marginTop: "10px" }}>Assign New Role</Label>
                    }
                    {!this.props.assignRole &&
                        <>
                            <Input type="text" placeholder="Name" />
                            <Input  style={{ marginLeft: 10 }}type="text" placeholder="Email" />
                            <Input style={{ marginLeft: 10 }} type="select" >
                                <option value="Admin">Admin</option>
                                <option value="Management">Management</option>
                                <option value="Internal Employee">Internal Employee</option>
                                <option value="External Employee">External Employee</option>
                                <option value="Designer">Designer</option>
                                <option value="Client">Client</option>
                            </Input>
                            <Button style={{ marginLeft: 10 }} className="btn btn-info"> <i className="fa fa-search "></i></Button>
                        </>
                    }
                </Col>
                <Col xs="12" md="2" lg="2">
                    {!this.props.assignRole &&
                        <Button onClick={this.props.AssignRoleHandler} className="btn btn-success " style={{ float: "right", fontSize: "medium" }}>
                            <i style={{ marginRight: 5 }} className="fa fa-plus "></i>
                            Assign Role
                        </Button>}
                    {this.props.assignRole &&
                        <Button onClick={this.props.AssignRoleHandler} className="btn btn-info " style={{ float: "right", fontSize: "medium" }}>
                            Role List
                        </Button>}
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => {
    return {
        assignRole: state.roleDetail.assignRole,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        AssignRoleHandler: () => dispatch(AssignRoleHandler()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RoleSearch);
