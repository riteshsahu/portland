import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Row, CardFooter, Col } from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
import ReviewResponse from '../ReviewResponse/reviewResponse';
import { getFbReviews } from './reducer/action.fbReview';
import { connect } from "react-redux";


class FBReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            togleButton: true,
            discription: '',
            rating: 1,
            togle: false,
            fbData: null
        }
    }


    componentDidMount = () => {
        this.props.getFbReviews();
    }


    componentWillReceiveProps = (props) => {
        this.setState({
            fbData: props.ReviewData
        })
    }
    handleResponse = (data) => {
        console.log(data);
    }

    handleError = (error) => {
        this.setState({ error });
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
        console.log("data of state", this.state)
        console.log("data in reducer ReviewData", this.props.ReviewData);
        console.log("data in fbData", this.state.fbData)
        if (this.state.fbData === null) {
            return null;
        }
        return (
            <div>
                <Row>
                    {this.state.fbData.map(text =>
                        <>
                            <Col lg="4" sm="12" md="12">
                                <Card className="border-primary">
                                    <CardHeader>
                                        Arpit Agrawal
                                    <span style={{ float: "right" }} onClick={this.handleReviewResponse} class="cui-share" aria-hidden="true" ></span>
                                    </CardHeader>
                                    <h6 style={{ margin: 10, marginLeft: 20 }}>agrawalarpit.work@gmail.com</h6>
                                    <CardBody>
                                        {text.review_text.length > 170 && this.state.togleButton ? (
                                            <div >
                                                {text.review_text.substr(0, 170)}
                                                <a href="javascript:void(0)" onClick={this.togleSeeMore}>...see more</a>
                                            </div>) :

                                            <div>
                                                {text.review_text}
                                                {!(text.review_text.length < 170) &&
                                                    <a href="javascript:void(0)" onClick={this.togleSeeLess}>...see less</a>}
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
                            </Col>
                            <>
                                {this.state.togle ? <ReviewResponse small={this.state.togle} toggleSmall={this.togleModel} /> : null}
                            </>
                        </>
                    )}
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

        ReviewData: state.FbReviews.ReviewData
    };
};
function mapDispatchToProps(dispatch) {

    return {
        getFbReviews: () => dispatch(getFbReviews())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FBReview);
