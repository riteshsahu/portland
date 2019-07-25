import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import UserList from './userList/userList';
import UserSearch from './UserSearch/UserSearch';
import CreateUser from './createUser/createUser';
import { connect } from "react-redux";
import { CreateUserHandler } from './reducer/userDetail.action';
class userDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
                <Card style={{ marginTop: "10px" }}>
                    <CardHeader className="header" >
                        <UserSearch />
                    </CardHeader>
                    <CardBody >
                        {!this.props.createUser && <UserList />}
                        {this.props.createUser && <CreateUser />}
                    </CardBody>
                </Card>
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
export default connect(mapStateToProps, mapDispatchToProps)(userDetail);
