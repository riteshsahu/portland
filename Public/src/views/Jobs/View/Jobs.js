import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from "react-redux";
import JobList from './Joblist/Joblist';
import JobSearch from './jobSearch/jobSearch';
import CreateJob from './createJob/createJob';
import {CreateJobHandler} from '../jobs.action';

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        console.log('----createJob---0', this.props.createJob);
        return (
            <Card style={{ marginTop: "10px" }}>
                <CardHeader >
                    <JobSearch />
                </CardHeader>

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
        updateJob: state.jobDetail.updateJob
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CreateJobrHandler : () => dispatch(CreateJobHandler()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
