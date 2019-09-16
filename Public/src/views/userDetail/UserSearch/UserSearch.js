import React, { Component } from 'react';
import { Button, Col, Label, Input, Row } from 'reactstrap';
import '../user.css'
import { connect } from "react-redux";
import { CreateUserHandler,searchUser } from '../userDetail.action';
import {getSearchOFF } from '../../Jobs/jobs.action';
class UserSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPermission: false,
            searchDetails: {
                role: '',
                firstName: '',
                lastName: '',
                email: ''
            }
        }
    }
    
    handleSearchChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        let temp = this.state.searchDetails;
        temp[id] = value;
        this.setState({
            searchDetails: temp
        })
    }
    
    searchUser =() => {
        this.setState({
            searchPermission: true
        })
    }

    render() {
        if(this.state.searchPermission || this.props.saerchPermission){
        this.props.searchUser(this.state.searchDetails);
            this.setState({
                searchPermission: false
            });
            this.props.getSearchOFF();
        }

        return (
            <Row className="header">
                <Col style={{ display: "flex" }} xs="12" md="10" lg="10">
                    {this.props.createUser &&
                        <Label>Create New User</Label>
                    }
                    {!this.props.createUser &&
                        <>
                        <Input  style= {{width: "25%"}}id="role" type="select" onChange={this.handleSearchChange}>
                            <option value="2">Management</option>
                            <option value="3">Internal Employee</option>
                            <option value="4">External Employee</option>
                            <option value="5">Designer</option>
                            <option value="6">Client</option>
                        </Input>
                            <Input  id="firstName"onChange={this.handleSearchChange} type="text" placeholder=" First Name" />
                            <Input  id="lastName" onChange={this.handleSearchChange} type="text" placeholder=" Last Name" />
                            <Input  id="email" onChange={this.handleSearchChange} type="text" placeholder="Email Address " />
                            <Button onClick={this.searchUser}className="btn btn-info " > <i className="fa fa-search "></i></Button>
                        </>
                    }
                </Col>
                <Col xs="12" md="2" lg="2">
                    {!this.props.createUser &&
                        <Button onClick={this.props.CreateUserHandler}  style={{ float: "right", background: "#ff8f00", fontSize: "large",color: "white" }}>
                            <i style={{ marginRight: 5 }} className="fa fa-plus "></i>
                            Create User
                        </Button>}
                    {this.props.createUser &&
                        <Button onClick={this.props.CreateUserHandler} style={{ float: "right",background: "#ff8f00",fontSize: "large", color: "white" }}>
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
        saerchPermission: state.jobDetail.saerchPermission
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CreateUserHandler: () => dispatch(CreateUserHandler()),
        searchUser: (data) => dispatch(searchUser(data)),
        getSearchOFF:()=> dispatch(getSearchOFF())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);
