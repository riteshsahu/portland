import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { deleteRole, updateRole } from '../reducer/role.action';

class RoleList extends Component {
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

    deleteRole = () => {
        this.setState({
            small: !this.state.small,
        });
        this.props.deleteRole(this.state.deleteIndex);
    }

    showRoleList = () => {
        let result = [];
        this.props.roleDetails.map((data, i) => {
            result.push(<tr key={i}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
                <td>
                    <i style={{ color: "green", padding: "0px 5px" }} onClick={e => { this.props.updateRole(data) }} className="cui-pencil icons font-xl"></i>
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
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showRoleList()}
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
                            Are You Sure You Want To Delete This Role?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.deleteRole}>Yes</Button>{' '}
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
        roleDetails: state.roleDetail.roleDetails,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteRole: (value) => dispatch(deleteRole(value)),
        updateRole: (value) => dispatch(updateRole(value))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RoleList);
