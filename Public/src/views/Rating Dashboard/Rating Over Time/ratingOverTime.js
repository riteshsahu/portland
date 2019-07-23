import React, { Component } from 'react';
import { Card, CardHeader, Col, Label, Input, Row } from 'reactstrap';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';

class RatingOvertime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'A', value: 10,
                },
                {
                    name: ' B', value: 12,
                },
                {
                    name: ' C', value: 14,
                },
                {
                    name: ' D', value: 18,
                },
                {
                    name: ' E', value: 7,
                },
                {
                    name: ' F', value: 9,
                },
                {
                    name: ' G', value: 21,
                },
            ]
        }
    }

    render() {
        return (
            <>
                <Card style={{ height: 200, marginBottom: 0 }}>
                    <Label style={{ marginLeft: 10 }}> Reviews and Rating Over Time</Label>
                    <p style={{ marginLeft: 10 }} >You have increased your rating by  <span style={{ color: "blue" }}>10% </span>in the past 30 days.</p>

                    <Row>
                        <Col xs="12" md="6" >
                            <BarChart
                                width={300}
                                height={150}
                                data={this.state.data}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </Col>

                        <Col  xs="12" md="5" style={{marginLeft:15}} >
                            <Label><b>Best</b> July</Label><br/>
                            <Label  style={{background: "royalblue", width: 50, margin: 2, marginBottom:8, borderRadius: 10}}><Label style={{marginLeft: 8,marginBottom: 0,color:"white"}}>5.0</Label>&nbsp; <i style={{color: "white"}} className="fa fa-star  "></i> </Label> 
                            <Label>3.3K reviews</Label>
                            <br/>
                            <Label><b>Worst</b> July</Label><br/>
                            <Label  style={{background: "royalblue", width: 50, margin: 2, marginBottom:8, borderRadius: 10}}><Label style={{marginLeft: 8,marginBottom: 0,color:"white"}}>2.3</Label>&nbsp; <i style={{color: "white"}} className="fa fa-star  "></i></Label>
                            <Label> 53.7.3K reviews</Label>

                        </Col>
                    </Row>

                </Card>

            </>
        )
    }
}
export default RatingOvertime; 