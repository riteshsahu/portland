import React, { Component } from 'react';
import { Card, CardHeader, Col, Label, Input, Row } from 'reactstrap';


class ReviewSource extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Card style={{height: 210}}>
                    <Label  style={{marginLeft: 10}}>Top 5 Review Source</Label>
                    <p  style={{marginLeft: 10}} >Encourage your Happy customer to review you on  <span style={{ color: "blue" }}>facebook & twitter</span> </p>
                
                <Row>
                    <Col xs="12" md="4" style={{marginLeft: 10}}>
                        <Label><i className="fa fa-facebook-square fa-lg "></i> &nbsp; Facebook &nbsp; (0 )</Label> <br/>
                        <Label><i className="fa fa-google fa-lg"></i> &nbsp; Google &nbsp; (0 ) </Label><br/>
                        <Label><i className="fa fa-tripadvisor fa-lg"></i>  TripAdvisor &nbsp; (0 ) </Label>
                       
                    </Col>

                    <Col xs="12" md="2" style={{}}>
                        <Label  style={{background: "royalblue", width: 50, margin: 2, marginBottom:8, borderRadius: 10}}><Label style={{marginLeft: 10,marginBottom: 0,color:"white"}}>0</Label>&nbsp; <i style={{color: "white"}} className="fa fa-star  "></i></Label>
                        <Label  style={{background: "royalblue", width: 50, margin: 2,marginBottom:8, borderRadius: 10}}><Label style={{marginLeft: 10,marginBottom: 0,color:"white"}}>0</Label> &nbsp; <i style={{color: "white"}} className="fa fa-star  "></i></Label>
                        <Label  style={{background: "royalblue", width: 50, margin: 2,marginBottom:8, borderRadius: 10}}><Label style={{marginLeft: 10,marginBottom: 0,color:"white"}}>0</Label> &nbsp; <i style={{color: "white"}} className="fa fa-star  "></i></Label>

                    </Col>
                </Row>
            </Card>
        )
    }
}
export default ReviewSource; 