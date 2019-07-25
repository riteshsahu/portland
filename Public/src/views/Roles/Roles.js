import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import RoleList from './Rolelist/Rolelist';
import RoleSearch from './roleSearch/roleSearch';
import AssignRole from './createRole/createRole';
import {AssignRoleHandler} from './reducer/role.action';

class Roles extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Card style={{ marginTop: "10px" }}>
                <CardHeader >
                    <RoleSearch />
                </CardHeader>

                <CardBody>
                    {!this.props.assignRole && <RoleList />}
                    {this.props.assignRole && <AssignRole />}
                </CardBody>
            </Card>
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
        AssignRoleHandler : () => dispatch(AssignRoleHandler()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Roles);
