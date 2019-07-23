import React, { Component } from 'react';
import { Card, CardHeader, Col, Label, Input, Row } from 'reactstrap';
import CanvasJSReact from '../../../../src/assets/canvasjs.react';

// var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class RecentReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
    }


    toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        this.chart.render();
    }

    render() {

        const options = {
            theme: "light2",
            animationEnabled: true,
            // title:{
            // 	text: "Units Sold VS Profit"
            // },
            // subtitles: [{
            // 	text: "Click Legend to Hide or Unhide Data Series"
            // }],
            axisX: {
                title: ""
            },
            axisY: {
                title: "Rating",
                titleFontColor: "#6D78AD",
                lineColor: "#6D78AD",
                labelFontColor: "#6D78AD",
                tickColor: "#6D78AD",
                // includeZero: false
            },
            // axisY2: {
            // 	title: "Profit in USD",
            // 	titleFontColor: "#51CDA0",
            // 	lineColor: "#51CDA0",
            // 	labelFontColor: "#51CDA0",
            // 	tickColor: "#51CDA0",
            // 	includeZero: false
            // },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: this.toggleDataSeries
            },
            data: [{
                type: "spline",
                name: "facebook",
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#,##0 Units",
                dataPoints: [
                    { x: new Date(2019, 0, 1), y: 1000 },
                    { x: new Date(2019, 1, 1), y: 1000 },
                    { x: new Date(2019, 2, 1), y: 1000 },
                    { x: new Date(2019, 3, 1), y: 1000 },
                    { x: new Date(2019, 4, 1), y: 1000 },
                    { x: new Date(2019, 5, 1), y: 1000 },
                    { x: new Date(2019, 6, 1), y: 1000 },
                    { x: new Date(2019, 7, 1), y: 1000 },
                    { x: new Date(2019, 8, 1), y: 1000 },
                    { x: new Date(2019, 9, 1), y: 1000 },
                    { x: new Date(2019, 10, 1), y: 1000 },
                    { x: new Date(2019, 11, 1), y: 1000 }
                ]
            },
            {
                type: "spline",
                name: "google",
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#,##0 Units",
                dataPoints: [
                    { x: new Date(2019, 0, 1), y: 1500 },
                    { x: new Date(2019, 1, 1), y: 1500 },
                    { x: new Date(2019, 2, 1), y: 1500 },
                    { x: new Date(2019, 3, 1), y: 1500 },
                    { x: new Date(2019, 4, 1), y: 1500 },
                    { x: new Date(2019, 5, 1), y: 1500 },
                    { x: new Date(2019, 6, 1), y: 1500 },
                    { x: new Date(2019, 7, 1), y: 1500 },
                    { x: new Date(2019, 8, 1), y: 1500 },
                    { x: new Date(2019, 9, 1), y: 1500 },
                    { x: new Date(2019, 10, 1), y: 1500 },
                    { x: new Date(2019, 11, 1), y: 1500 }
                ]
            },
            {
                type: "spline",
                name: "trip adviser",
                // axisYType: "secondary",
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "#,##0 Units",
                dataPoints: [
                    { x: new Date(2019, 0, 1), y: 2000 },
                    { x: new Date(2019, 1, 1), y: 2000 },
                    { x: new Date(2019, 2, 1), y: 2000 },
                    { x: new Date(2019, 3, 1), y: 2000 },
                    { x: new Date(2019, 4, 1), y: 2000 },
                    { x: new Date(2019, 5, 1), y: 2000 },
                    { x: new Date(2019, 6, 1), y: 2000 },
                    { x: new Date(2019, 7, 1), y: 2000 },
                    { x: new Date(2019, 8, 1), y: 2000 },
                    { x: new Date(2019, 9, 1), y: 2000 },
                    { x: new Date(2019, 10, 1), y: 2000 },
                    { x: new Date(2019, 11, 1), y: 2000 }
                ]
            }]
        }

        return (
            <>
                <Card style={{ height: "auto", marginBottom: 0 }}>
                    <Label style={{ marginLeft: 10 }}>Recent Reviews</Label>
                    <p style={{ marginLeft: 10 }} >You have had  <span style={{ color: "blue" }}>23 Reviews </span>in the past 30 days.  <span style={{ color: "blue" }}>12 Reviews</span> were three stars or less </p>
                    <div>
                        <CanvasJSChart options={options}
                            onRef={ref => this.chart = ref}
                        />
                        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                    </div>
                </Card>
                <br />
                {/* <Card>
                    <Col xs="12" md="12" >
                        <p style={{ marginBottom: 0, padding: 2 }}>See more Recent Reviews</p>
                    </Col>
                </Card> */}



            </>
        )
    }
}
export default RecentReview;

