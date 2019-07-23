import React , { Component } from 'react';
import { Button, Input, Table } from 'reactstrap';



class UserSupervisor extends Component{
    render(){
        return(
            <Table hover bordered striped responsive size="sm">
            <thead>
                <tr>
                <th><Input type="text" placeholder="User Name" /></th>
                <th><Input type="text" placeholder="Supervisor Name" /></th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Vishnu</td>
                    <td><Input disabled={true} value="Serghei" /></td>
                    <td >
                        <Button block outline color="success" >Edit</Button>
                        {/* <Button block outline color="success" >Save</Button> */}
                    </td>
                </tr>
                <tr>
                    <td>Vishnu</td>
                    <td><Input disabled={true} value="Phoibos" /></td>

                    <td >
                        <Button block outline color="success" >Edit</Button>
                        {/* <Button block outline color="success" >Save</Button> */}
                    </td>
                </tr>
                <tr>
                    <td>E3ohc</td>
                    <td><Input disabled={true} value="Randall" /></td>

                    <td >
                        <Button block outline color="success" >Edit</Button>
                        {/* <Button block outline color="success" >Save</Button> */}
                    </td>
                </tr>

            </tbody>
        </Table>
        );
    }
}

export default UserSupervisor;