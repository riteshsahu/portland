import React, { Component } from 'react';

import { Col,CardHeader,Input, Row, Card,CardBody } from 'reactstrap';
import Pending from './Pending/Pending';
import Accepted from './Accepted/Accepted';
import Rejected from './Rejected/Rejected';
import './Request.css';
// import { ImportExport } from 'aws-sdk';

class Request extends Component {
    constructor(props) {
        super(props);

      
        this.state = {
            tab: 1,
          
        };
    }

   
    request = (event) => {
        console.log("value---",event.target.value);
        this.setState({
            tab: event.target.value
        })
    }

    render() {
        return (
            
            <Row>
                <Col lg="12">
                    <Card>
                       
                         <CardHeader>
                        <Input type="select" className="inputDropdown"  onClick={e => { this.request(e) }}>
                            <option value="1" >Pending</option>
                            <option  value="2">Accepted</option>
                            <option value="3" >Rejected</option>
                        </Input>
                        </CardHeader>
                        <CardBody>
                            { this.state.tab == 1 && <Pending />} 
                            { this.state.tab == 2 && <Accepted />} 
                            { this.state.tab == 3 && <Rejected />} 

                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Request;