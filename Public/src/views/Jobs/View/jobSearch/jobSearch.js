import React, { Component } from 'react';
import { Button, Col, Label, Input, Row } from 'reactstrap';
import { connect } from "react-redux";
import { CreateJobHandler, searchJobs, getSearchOFF } from '../../jobs.action';

class JobSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPersmission: false,
            jobSearch:{
                job:"",
                jobStatus:"",
                jobCreatedBy:""
            }
        }
    }


    handleJobSearch=(e)=>{
        let id = e.target.id;
        let value =  e.target.value;
        let temp = this.state.jobSearch;
        temp[id] = value;
        this.setState({
            jobSearch: temp
        })
    }

    searchJobs=()=>{
        this.setState({
            searchPersmission: true
        })
        // let data= {
        //     //jobId=3423&jobStatus=1&jobCreatedBy=2
        //     jobId : this.state.jobSearch.job,
        //     jobStatus : this.state.jobSearch.jobStatus,
        //     jobCreatedBy : this.state.jobSearch.jobCreatedBy,
        // };
        // this.props.searchJobs(data);
    }

    render() {
            if(this.state.searchPersmission || this.props.saerchPermission){
                let data= {
                    jobId : this.state.jobSearch.job,
                    jobStatus : this.state.jobSearch.jobStatus,
                    jobCreatedBy : this.state.jobSearch.jobCreatedBy,
                };
                this.props.searchJobs(data);
                this.setState({
                    searchPersmission: false
                });
                this.props.getSearchOFF();
            }
        return (
            <Row>
                <Col style={{ display: "flex" }} xs="12" md="10" lg="10">
                    {this.props.createJob &&
                        <Label style={{ marginTop: "10px" }}>Create New Job</Label>
                    }
                    {!this.props.createJob &&
                        <>
                            <Input type="number" id="job" placeholder="Job ID" onChange={this.handleJobSearch} />
                            <Input style={{ marginLeft: 10 }} id="jobStatus" type="select" onChange={this.handleJobSearch} >
                            <option selected disabled >-- Select Job Status</option>
                                <option value="1">Pending</option>
                                <option value="2">Completed</option>
                            </Input>
                            <Input style={{ marginLeft: 10 }} id="jobCreatedBy" type="select" onChange={this.handleJobSearch} >
                            <option selected disabled >-- Select Job Creator</option>
                                <option value="1">Admin</option>
                                <option value="2">Management</option>
                                <option value="3">Internal Employee</option>
                                <option value="4">External Employee</option>
                                <option value="5">Designer</option>
                                <option value="6">Client</option>
                            </Input>
                            <Button style={{ marginLeft: 10 }} onClick={this.searchJobs} className="btn btn-info " > <i className="fa fa-search "></i></Button>
                        </>
                    }
                </Col>
                <Col xs="12" md="2" lg="2">
                    {!this.props.createJob &&
                        <Button onClick={this.props.CreateJobHandler}  style={{ float: "right", background: "#ff8f00", color: "white",fontSize: "medium" }}>
                            <i style={{ marginRight: 5 }} className="fa fa-plus "></i>
                            Create Job
                        </Button>}
                    {this.props.createJob &&
                        <Button onClick={this.props.CreateJobHandler}  style={{ float: "right",  background: "#ff8f00", color: "white",fontSize: "medium" }}>
                            Job List
                        </Button>}
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => {
    return {
        createJob: state.jobDetail.createJob,
        jobCreated: state.jobDetail.jobCreated,
        saerchPermission: state.jobDetail.saerchPermission
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CreateJobHandler: () => dispatch(CreateJobHandler()),
        searchJobs:(data)=> dispatch(searchJobs(data)),
        getSearchOFF:()=> dispatch(getSearchOFF())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(JobSearch);
