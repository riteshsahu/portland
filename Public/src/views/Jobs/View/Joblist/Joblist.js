
import React, { Component } from 'react';
import { Badge, Modal, ModalBody, ModalFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { deleteJob, updateJob, deleteUserJob, getAllJob } from '../../jobs.action';
import {getUserJobs} from '../../../../containers/DefaultLayout/action.defaultLayout';
import '../../jobs.css';
import PaginationComponent  from 'react-reactstrap-pagination';

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
            },
            selectedPage: 1
        }
        this.toggleSmall = this.toggleSmall.bind(this);
    }

    componentDidMount=()=>{
        
        const userDetails = localStorage.getItem("userDetails");
        const user = JSON.parse(userDetails);
        this.props.getAllJob(user[0].userId);
        this.props.getUserJobs(user[0].userId);
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
        // this.props.deleteJob(this.state.deleteIndex);
        this.props.deleteUserJob(this.state.jobId);
    }

    showJobList = () => {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
       if( this.props.jobDetails && this.props.jobDetails.length > 0){
        return this.props.jobDetails.map((data, i) => 
              <tr key = {i}>
                <td>{data.jobId}</td>
                <td>{data.jobTitle}</td>
                <td>{ data.createAt.split("T")[0]}</td>
                <td>{this.state.createByKey[data.createByRole]}</td>
                <td> <Badge color="warning">{this.state.statusKey[data.jobStatus]}</Badge></td>
                <td>
                    <i onClick={e => { this.props.updateJob(data) }} className="cui-pencil icons font-xl editButton"></i>
                    {userDetails[0].role == 1 ? <i onClick={e => { this.toggleSmall(i, data.jobId) }} className="cui-trash icons font-xl deleteButton"></i> : null }
                </td>
            </tr> 
        )
       }
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
                                    <th>Created Date</th>
                                    <th>Created By</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showJobList()}
                            </tbody>
                        </Table>
                        <div style={{marginLeft: "30%",marginTop: "20px"}}>
                        <PaginationComponent totalItems={10} pageSize={10} 
                        // onSelect={this.handleSelected}
                        activePage={this.state.selectedPage} />
                        </div>
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
        getUserJobs: (id) => dispatch(getUserJobs(id))

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(JobList);

