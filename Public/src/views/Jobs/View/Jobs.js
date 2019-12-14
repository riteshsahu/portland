import React, { Component } from 'react';
import { Card, CardHeader, CardBody,Row,Alert } from 'reactstrap';
import { connect } from "react-redux";
import JobList from './Joblist/Joblist';
import JobSearch from './jobSearch/jobSearch';
import CreateJob from './createJob/createJob';


class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Card>
                <CardHeader >
                    <JobSearch />
                </CardHeader>
    
    {this.props.errorFrom === "JOB_DETAILS" ?
            <Row>
                <Alert color= "danger">{this.props.errorName}</Alert>
            </Row>
              : null }

                <CardBody>
                    {!this.props.createJob && <JobList />}
                    {this.props.createJob && <CreateJob updateJob={this.props.updateJob}/>}
                </CardBody>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        createJob: state.jobDetail.createJob,
        updateJob: state.jobDetail.updateJob,
        errorName: state.ProfileDetail.errorMessage.errorName,
        errorFrom: state.ProfileDetail.errorMessage.errorFrom
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
