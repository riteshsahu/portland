import React, { Component } from 'react';
import { connect } from "react-redux";
import Messenger from './Messenger/Messenger';
import {Row, Alert} from 'reactstrap';
import { getJobDetails, getJobParticipants } from '../action.activeJobs';

class ActiveJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
       

    }

    componentDidMount() {
        this.props.getJobDetails(this.props.match.params.id);
        this.props.getJobParticipants(this.props.match.params.id);
    }
    
    render() {
        return (
            <div style={{ width: "100%",height: "100%", display: "flex", flexDirection: "column", flexWrap: "nowrap"}}>
                {this.props.errorFrom === "ACTIVE_JOB_DETAIL" ?
            <Row>
                <Alert color= "danger">{this.props.errorName}</Alert>
            </Row>
              : null }
                <Messenger   history={this.props.history} params={this.props.match.params}/>               

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
        getJobDetails: (id) => dispatch(getJobDetails(id)),
        getJobParticipants: (id) => dispatch(getJobParticipants(id))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobs);

