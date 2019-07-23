import React, { Component } from 'react';
import { Button, Input, Table } from 'reactstrap';


class UserGroupList extends Component {
    render() {
        return (
            <Table hover bordered striped responsive size="sm">
                <thead>
                    <tr>
                    <th><Input type="text" placeholder="User Name" /></th>
                <th><Input type="text" placeholder="Group Name" /></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Serghei</td>
                        <td><Input disabled={true} type="select" value="Vishnu group" >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Input>
                        </td>
                        <td >
                            {/* <Button block outline color="success" >Edit</Button> */}
                            <Button block outline color="success" >Save</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Phoibos</td>
                        <td><Input disabled={true} value="Vishnu group" /></td>
                        <td >
                            {/* <Button block outline color="success" >Edit</Button> */}
                            <Button block outline color="success" >Save</Button>
                        </td>
                    </tr>
                    <tr>
                        <td>Randall</td>
                        <td><Input disabled={true} value="E3ohc group" /></td>
                        <td >
                            {/* <Button block outline color="success" >Edit</Button> */}
                            <Button block outline color="success" >Save</Button>
                        </td>
                    </tr>

                </tbody>
            </Table>
        );
    }
}

export default UserGroupList;