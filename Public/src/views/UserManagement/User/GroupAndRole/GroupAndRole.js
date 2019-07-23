import React, { Component } from 'react';
import {  Table, Input } from 'reactstrap';



class GroupAndRole extends Component {
    render() {
        return (
            <Table hover bordered striped responsive size="sm">
                <thead>
                    <tr>
                    <th><Input type="text" placeholder="Group Name" /></th>
                <th><Input type="text" placeholder="Role Name" /></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>XYZ</td>
                        <td><Input disabled={true} type="text" value="Supervisor" /></td>
                    </tr>
                    <tr>
                        <td>ABC</td>
                        <td><Input disabled={true} type="text" value="User" /></td>

                    </tr>
                    <tr>
                        <td>MNO</td>
                        <td><Input disabled={true} type="text" value="Supervisor" /></td>
                    </tr>

                </tbody>
            </Table>
        );
    }
}

export default GroupAndRole;