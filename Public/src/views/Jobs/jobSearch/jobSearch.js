import React, { Component } from 'react';
import { Button, Col, Label, Input, Row } from 'reactstrap';
import { connect } from "react-redux";
import { CreateJobHandler } from '../reducer/jobs.action';

class JobSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Row>
                <Col style={{ display: "flex" }} xs="12" md="10" lg="10">
                    {this.props.createJob &&
                        <Label style={{ marginTop: "10px" }}>Create New Job</Label>
                    }
                    {!this.props.createJob &&
                        <>
                            <Input type="text" placeholder="Job" />
                            <Input style={{ marginLeft: 10 }} type="select" >
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </Input>
                            <Input style={{ marginLeft: 10 }} type="select" >
                                <option value="Admin">Admin</option>
                                <option value="Management">Management</option>
                                <option value="Internal Employee">Internal Employee</option>
                                <option value="External Employee">External Employee</option>
                                <option value="Designer">Designer</option>
                                <option value="Client">Client</option>
                            </Input>
                            <Button style={{ marginLeft: 10 }} className="btn btn-info " > <i className="fa fa-search "></i></Button>
                        </>
                    }
                </Col>
                <Col xs="12" md="2" lg="2">
                    {!this.props.createJob &&
                        <Button onClick={this.props.CreateJobHandler} className="btn btn-success " style={{ float: "right", fontSize: "medium" }}>
                            <i style={{ marginRight: 5 }} className="fa fa-plus "></i>
                            Create Job
                        </Button>}
                    {this.props.createJob &&
                        <Button onClick={this.props.CreateJobHandler} className="btn btn-info " style={{ float: "right", fontSize: "medium" }}>
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
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CreateJobHandler: () => dispatch(CreateJobHandler()),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(JobSearch);
