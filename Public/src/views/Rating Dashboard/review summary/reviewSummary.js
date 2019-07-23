import React, { Component } from 'react';
import { Card, CardHeader, Col, Label, Input, Row,Progress,CardBody} from 'reactstrap';


class ReviewSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Card>
                    <Label  style={{marginLeft: 10}}>Review Summary</Label>
                    <p  style={{marginLeft: 10}}>You have received <span style={{ color: "blue" }}>0 reviews</span> in the past 30 days</p>
                
                <Row>
                    <Col xs="12" md="2" lg="2" style={{marginLeft: 10}}>
                        <p style={{fontSize: 15,marginBottom:0}}>5 &nbsp; <i style={{color: "grey"}} className="fa fa-star "></i> </p> 
                        <p style={{fontSize: 15,marginBottom:0}}>4 &nbsp; <i  style={{color: "grey"}}  className="fa fa-star "></i> </p>
                        <p style={{fontSize: 15,marginBottom:0}}>3 &nbsp; <i  style={{color: "grey"}}  className="fa fa-star "></i> </p>
                        <p style={{fontSize: 15,marginBottom:0}}>2 &nbsp; <i  style={{color: "grey"}}  className="fa fa-star "></i> </p>
                        <p style={{fontSize: 15,marginBottom:0}}>1 &nbsp;  <i  style={{color: "grey"}}  className="fa fa-star "></i> </p>
                        <p style={{fontSize: 15,marginBottom:0}}>0 &nbsp;  <i   style={{color: "grey"}} className="fa fa-star "></i> </p>
                    </Col>

                    <Col xs="12" md="6" lg="6" style={{marginTop: 8}}>
                            <Progress style={{marginBottom:5}} value="100" />
                            <Progress style={{marginBottom:5}} value={75} />
                            <Progress style={{marginBottom:5}} value={50} />
                            <Progress style={{marginBottom:5}} value={5} />
                            <Progress style={{marginBottom:5}} value={1}/>
                            <Label  style={{}} > 10 Reviews do not have a rating</Label>
                    </Col>

                    <Col xs="12" md="4" lg="3" style={{marginTop: 8}}>
                        <Label style={{fontSize: 50,color: "blue"}}>5</Label> <br/>
                        <Label style={{color: "blue"}}>10 Reviews</Label>
                    </Col>
                </Row>
            </Card>
        )
    }
}
export default ReviewSummary; 