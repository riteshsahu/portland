import React, { Component } from 'react';
import { Button, CardHeader, Row, Col, Card, CardBody, } from 'reactstrap';
import './UserGroup.css';
import GroupList from './GroupList/GroupList';
import AddNewGroup from './AddNewGroup/AddNewGroup';
import { connect } from "react-redux";
import { addGroup } from './reducer/UserGroup.action';


class UserGroup extends Component {
constructor(props){
    super(props);
    this.state={
     
    }
}




    render() {
        return (
            <Row>
                <Col lg="12">
                    <Card>

                        <CardHeader style={{paddingLeft: "85%"}}>
                        { !( this.props.openTab == 2) && <Button block color="info" style={{color: "white"}} onClick={e=> {this.props.addGroup(2)}}>+ Add Group</Button> }
                        
                        </CardHeader>
                        <CardBody>
                        { this.props.openTab == 1 && <GroupList /> }   
                        { this.props.openTab == 2 && <AddNewGroup /> }   

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}


const mapStateToProps = state => {
	return {
		openTab  : state.UserGroup.openTab
	};
  };
  



function mapDispatchToProps (dispatch){ 
	return{
        addGroup : (value ) => dispatch( addGroup( value)),
	   
	 };
 }
export default connect(mapStateToProps, mapDispatchToProps)(UserGroup);
