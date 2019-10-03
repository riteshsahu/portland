import React, { Component } from 'react';
import { connect } from "react-redux";
import Messenger from './Messenger/Messenger';
import {Row,Alert} from 'reactstrap';

class ArchivedJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
       

    }
    render() {
        return (
            <div style={{ width: "100%",height: "100%", display: "flex", flexDirection: "column", flexWrap: "nowrap"}}>
                
                {this.props.errorFrom === "ARCHIVED_JOB" ?
            <Row>
                <Alert color= "danger">{this.props.errorName}</Alert>
            </Row>
              : null }
                <Messenger params={this.props.match.params}/>               

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        errorName: state.ProfileDetail.errorMessage.errorName,
        errorFrom: state.ProfileDetail.errorMessage.errorFrom
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ArchivedJobs);

