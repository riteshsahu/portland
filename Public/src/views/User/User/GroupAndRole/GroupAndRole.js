import React, { Component } from 'react';
import {  Table } from 'reactstrap';



class GroupAndRole extends Component {
    render() {
        return (
            <Table hover bordered striped responsive size="sm">
                <thead>
                    <tr>
                        <th>Group</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>XYZ</td>
                        <td>Supervisor</td>

                    </tr>
                    <tr>
                        <td>ABC</td>
                        <td>User</td>

                    </tr>
                    <tr>
                        <td>MNO</td>
                        <td>Supervisor</td>

                    </tr>

                </tbody>
            </Table>
        );
    }
}

export default GroupAndRole;