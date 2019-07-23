import React , { Component} from 'react';
import { connect } from "react-redux";
import { showList } from '../reducer/UserGroup.action';
import { Row, Input, Button, Col } from 'reactstrap';


class addNewGroup extends  Component{
    render(){
        return(
            <Row> 
                    <Col xs="12" md="12" lg="12">
                        <Input type="text" placeholder="Enter New Group Name" style={{marginBottom: 10}}/>
                        <Button className="btn btn-danger" onClick={e=>{this.props.showList(1)}} style={{marginRight: 5}}> Cancel</Button>
                        <Button className="btn btn-success" onClick={e=>{this.props.showList(1)}}>Save</Button>
                    </Col>

                </Row>
        );
    }
}




function mapDispatchToProps (dispatch){ 
	return{
        showList : (value ) => dispatch( showList( value)),
	   
	 };
 }
export default connect(null, mapDispatchToProps)(addNewGroup);

