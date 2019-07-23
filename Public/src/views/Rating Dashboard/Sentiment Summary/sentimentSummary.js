import React, { Component } from 'react';
import { Card, CardHeader, Col, Label, Input, Row } from 'reactstrap';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';


class SentimentSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'A', value: 3,
                },
                {
                    name: ' B', value: 9,
                },
                {
                    name: ' C', value: 11,
                },
                {
                    name: ' D', value: 6,
                },
                {
                    name: ' E', value: 4,
                },
                {
                    name: ' F', value: 8,
                },
                {
                    name: ' G', value: 2,
                },
            ]
        }
    }
    render() {
        return (
            <>
                <Card style={{ height: 200, marginBottom: 0 }}>
                    <Label style={{ marginLeft: 10 }}>Sentiment Summary</Label>
                    <p style={{ marginLeft: 10 }} >You have Received <span style={{ color: "blue" }}>4 Negative Reviews </span>in the past 30 days.</p>

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
                                <Bar dataKey="value" fill="green" />
                            </BarChart>
                        </Col>
                        <Col xs="12" md="3" style={{marginLeft: 20}}>
                        <p>Total</p>
                        <p>Positive</p>
                        <p>Neutral</p>
                        <p>Negative</p>
                        </Col>

                        <Col xs="12" md="2" style={{marginLeft: 20}}>
                                <p>150</p>
                                <p>90</p>
                                <p>20</p>
                                <p>40</p>
                        </Col>
                    </Row>
                </Card>

            </>
        )
    }
}
export default SentimentSummary; 