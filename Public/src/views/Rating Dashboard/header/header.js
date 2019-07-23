import React, { Component } from 'react';
import {Row, Label, Col ,Card} from 'reactstrap';
import DropDown from './dropdown';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Card  style={{marginTop: 10}}>
           <Row style={{margin: 10}}>
               <Col xs="12" sm="6" md="2" >
               <Label>Location</Label>
               <DropDown/>
               </Col>
               <Col xs="12" sm="6" md="2">
               <Label>Review Source</Label>
               <DropDown/>
               </Col>
               <Col xs="12" sm="6" md="2">
               <Label>Time</Label>
               <DropDown/>
               </Col>
               <Col xs="12" sm="6" md="2">
               <Label>Rating</Label>
               <DropDown/>
               </Col>
           </Row>
           </Card>
        )
    }
}
export default Header; 