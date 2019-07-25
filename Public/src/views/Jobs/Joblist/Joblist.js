import React, { Component } from 'react';
import { Badge, Modal, ModalBody, ModalFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { deleteJob, updateJob } from '../reducer/jobs.action';

class JobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            small: false,
            deleteIndex: ''
        }
        this.toggleSmall = this.toggleSmall.bind(this);
    }

    toggleSmall(i) {
        this.setState({
            deleteIndex: i,
            small: !this.state.small,
        });
    }

    deleteJob = () => {
        this.setState({
            small: !this.state.small,
        });
        this.props.deleteJob(this.state.deleteIndex);
    }

    showJobList = () => {
        let result = [];
        this.props.jobDetails.map((data, i) => {
            result.push(<tr>
                <td>{data.job}</td>
                <td>{data.create_date}</td>
                <td>{data.create_time}</td>
                <td>{data.created_by}</td>
                <td> <Badge color="warning">{data.status}</Badge></td>
                <td>
                    <i style={{ color: "green", padding: "0px 5px" }} onClick={e => { this.props.updateJob(data) }} className="cui-pencil icons font-xl"></i>
                    <i style={{ color: "red", padding: "0px 5px" }} onClick={e => { this.toggleSmall(i) }} className="cui-trash icons font-xl"></i>
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
                                    <th>Job</th>
                                    <th> Created Date</th>
                                    <th>Created Time</th>
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
        updateJob: (value) => dispatch(updateJob(value))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(JobList);
