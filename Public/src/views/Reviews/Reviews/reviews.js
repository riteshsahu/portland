import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Row, CardFooter, } from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
import ReviewResponse from '../ReviewResponse/reviewResponse';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            togleButton: true,
            discription: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
            laoreet dolore magna aliquam Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
            laoreet dolore magna aliquam.`,
            rating: 1,
            togle: false
        }
    }

    togleSeeMore = () => {
        this.setState({
            togleButton: false
        })
    }

    togleSeeLess = () => {
        this.setState({
            togleButton: true
        })
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    handleReviewResponse = () => {
        this.setState({
            togle: !this.state.togle
        })
    }

    togleModel = () => {
        this.setState({
            togle: !this.state.togle
        })
    }

    render() {
        return (
            <div>
                <Card className="border-primary">
                    <CardHeader>
                        Arpit Agrawal
                        <span style={{ float: "right" }} onClick={this.handleReviewResponse} class="cui-share" aria-hidden="true" ></span>
                    </CardHeader>
                    <h6 style={{ margin: 10, marginLeft: 20 }}>agrawalarpit.work@gmail.com</h6>
                    <CardBody>
                        {this.state.discription.length > 170 && this.state.togleButton ? (
                            <div >
                                {this.state.discription.substr(0, 170)}
                                <a href="javascript:void(0)" onClick={this.togleSeeMore}>...see more</a>
                            </div>) :
                            <div>
                                {this.state.discription}
                                <a href="javascript:void(0)" onClick={this.togleSeeLess}>...see less</a>
                            </div>
                        }
                    </CardBody>
                    <CardFooter>
                        <Row style={{ marginBottom: -25 }}>
                            <div style={{ fontSize: 35 }}>
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={this.state.rating}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                            </div>
                            <div style={{ marginLeft: "auto", marginTop: 15 }}>
                                04/06/2019
                            </div>
                        </Row>
                    </CardFooter>
                </Card>
                {this.state.togle ? <ReviewResponse small={this.state.togle} toggleSmall={this.togleModel} /> : null}
            </div>
        )
    }
}

export default Review; 