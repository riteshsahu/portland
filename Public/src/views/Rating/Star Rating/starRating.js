import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Details from './details';
import Experience from './experience';
import { Button } from 'reactstrap';

class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
        }

    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    handleReset=() => {
        this.setState({
            rating: 0
        })
    }
    render() {
        return (
            <>
            <div style={{ fontSize: 150, marginLeft: 150 }}>
            <StarRatingComponent
                name="rate1"
                starCount={5}
                value={this.state.rating}
                onStarClick={this.onStarClick.bind(this)}
            />
             </div>
             {this.state.rating>3 ?  <Details/> : null}
           
           {this.state.rating>=1 && this.state.rating<=3 ? <Experience/> : null }
           <Button onClick={this.handleReset} style={{float: "right"}} className="btn btn-danger">
               Reset
           </Button>
           </>
        )
    }
}
export default StarRating; 