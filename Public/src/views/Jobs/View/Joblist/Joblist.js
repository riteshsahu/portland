import React, { Component } from 'react';
import { Badge, Modal, ModalBody, ModalFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { deleteJob, updateJob, deleteUserJob, getAllJob } from '../../jobs.action';
import {GetUserJobs} from '../../../../containers/DefaultLayout/action.defaultLayout';
class JobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobId:"",
            small: false,
            deleteIndex: '',
            statusKey:{
                1 : "Pending",
                2: "Completed"
            },
            createByKey:{
                1 : "Admin",
                2 : "Management",
                3 : "Internal Employee",
                4 : "External Employee",
                5 : "Designer",
                6 : "Client"
            }
        }
        this.toggleSmall = this.toggleSmall.bind(this);
    }

    componentDidMount=()=>{
        
        const userDetails = localStorage.getItem("userDetails");
        const user = JSON.parse(userDetails);
        this.props.getAllJob(user[0].userId);
        this.props.GetUserJobs(user[0].userId);
        
        console.log('---getting All jobs----');
    }

    toggleSmall(i, jobId) {
        this.setState({
            deleteIndex: i,
            small: !this.state.small,
            jobId: jobId
        });
    }

    deleteJob = () => {
        this.setState({
            small: !this.state.small,
        });
        console.log("----jobId---",this.state.jobId);
        // this.props.deleteJob(this.state.deleteIndex);
        this.props.deleteUserJob(this.state.jobId);
    }

    showJobList = () => {
        let result = [];
        this.props.jobDetails.map((data, i) => {
            let date= data.createAt.split("T");
            result.push(<tr>
                <td>{data.jobId}</td>
                <td>{data.jobTitle}</td>
                <td>{date[0]}</td>
                <td>{this.state.createByKey[data.jobCreatedBy]}</td>
                <td> <Badge color="warning">{this.state.statusKey[data.jobStatus]}</Badge></td>
                <td>
                    <i style={{ color: "green", padding: "0px 5px" }} onClick={e => { this.props.updateJob(data) }} className="cui-pencil icons font-xl"></i>
                    <i style={{ color: "red", padding: "0px 5px" }} onClick={e => { this.toggleSmall(i, data.jobId) }} className="cui-trash icons font-xl"></i>
                </td>
            </tr>)
        })
        return result
    }
    render() {
        return (
            <>
                <Row>
                    <Col>
                        <Table hover bordered striped responsive size="sm">
                            <thead>
                                <tr>
                                    <th>Job ID</th>
                                    <th>Job</th>
                                    <th> Created Date</th>
                                    <th>Created By</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showJobList()}
                            </tbody>
                        </Table>
                        <nav>
                            <Pagination style={{ marginLeft: "35%" }}>
                                <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                                <PaginationItem active>
                                    <PaginationLink tag="button">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                            </Pagination>
                        </nav>
                    </Col>
                </Row>
                <Row>
                    <Modal isOpen={this.state.small} toggle={this.toggleSmall}
                        className={'modal-sm ' + this.props.className}>
                        <ModalBody>
                            Are You Sure You Want To Delete This Job?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.deleteJob}>Yes</Button>{' '}
                            <Button color="secondary" onClick={this.toggleSmall}>No</Button>
                        </ModalFooter>
                    </Modal>
                </Row>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        jobDetails: state.jobDetail.jobDetails,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteJob: (value) => dispatch(deleteJob(value)),
        updateJob: (value) => dispatch(updateJob(value)),
        deleteUserJob:(id) => dispatch(deleteUserJob(id)),
        getAllJob:(id)=> dispatch(getAllJob(id)),
        GetUserJobs: (id) => dispatch(GetUserJobs(id))

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(JobList);
