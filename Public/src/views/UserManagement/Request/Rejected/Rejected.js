import React, { Component } from 'react';

import { Button,Table } from 'reactstrap';



class Rejected extends Component {
    render() {
        return (
            <Table hover bordered striped responsive size="sm">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Vishnu</td>
                    <td>Serghei</td>
                    <td>Vishnu@gmail.com</td>
                    <td>Member</td>
                    <td className="tdPropertry">
                     <Button block outline color="success" className="ButtonPropetry">Accept</Button>
                    </td>
                </tr>
                <tr>
                    <td>Zbyněk</td>
                    <td>Phoibos</td>
                    <td>Zbyněk@gmail.com</td>
                    <td>Staff</td>
                    <td className="tdPropertry">
                     <Button block outline color="success" className="ButtonPropetry">Accept</Button>
                    </td>
                </tr>
                <tr>
                    <td>Einar</td>
                    <td>Randall</td>
                    <td>Einar@gmail.com</td>
                    <td>Admin</td>
                    <td className="tdPropertry">
                     <Button block outline color="success" className="ButtonPropetry">Accept</Button>
                    </td>
                </tr>
               
            </tbody>
        </Table>
        );
    }
}

export default Rejected;