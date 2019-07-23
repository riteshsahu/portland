import React , { Component} from 'react';
import { Button, Input, Table } from 'reactstrap';

class GroupList extends  Component{
    constructor(props){
        super(props);
        this.state={
            // buttonDisable: 
        }
    }
    render(){
        return(
            <Table hover bordered striped responsive size="sm">
            <thead>
                <tr>
                    <th>Group Name</th>
                    <th>Created By</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><Input disabled={true} value="Vishnu group" /></td>
                    <td>Serghei</td>
                    <td className="tdPropertryGroup">
                        <Button block outline color="success" >Edit</Button>
                        {/* <Button block outline color="success" >Save</Button> */}
                        <Button block outline color="danger">Remove</Button>
                    </td>
                </tr>
                <tr>
                    <td><Input disabled={true} value="Vishnu group" /></td>
                    <td>Phoibos</td>
                    <td className="tdPropertryGroup">
                        <Button block outline color="success" >Edit</Button>
                        {/* <Button block outline color="success" >Save</Button> */}
                        <Button block outline color="danger">Remove</Button>
                    </td>
                </tr>
                <tr>
                    <td><Input disabled={true} value="E3ohc group" /></td>
                    <td>Randall</td>
                    <td className="tdPropertryGroup">
                        <Button block outline color="success" >Edit</Button>
                        {/* <Button block outline color="success" >Save</Button> */}
                        <Button block outline color="danger">Remove</Button>
                    </td>
                </tr>

            </tbody>
        </Table>
        );
    }
}

export default GroupList;