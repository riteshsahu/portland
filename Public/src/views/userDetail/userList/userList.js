import React, { Component } from 'react';
import { Badge, Modal, ModalBody, ModalFooter, Button, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { deleteUserData, updateUser,GetUserList } from '../reducer/userDetail.action';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleKey:{
                1 : "Admin",
                2 : "Management",
                3 : "Internal Employee",
                4 : "External Employee",
                5 : "Designer",
                6 : "Client"
            },
            small: false,
            deleteIndex: ''
        }
        this.toggleSmall = this.toggleSmall.bind(this);
    }


    componentDidMount= () => {
        this.props.GetUserList();
    }

    componentWillReceiveProps =() => {
      if(  this.props.userDeleted) {
        this.props.GetUserList();

      }
    }
    toggleSmall(i) {
        this.setState({
            deleteIndex: i,
            small: !this.state.small,
        });
    }

    deleteUser = () => {
        this.setState({
            small: !this.state.small,
        });
        this.props.deleteUserData(this.state.deleteIndex);
    }

    showUserList = () => {
        let result = [];
        if(this.props.userDetails.length > 0){
        this.props.userDetails.map((data, i) => {
            result.push(<tr>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.createdAt}</td>
                <td>{this.state.roleKey[data.role]}</td>
                <td>
                    <Badge color="success">Active</Badge>
                </td>
                <td>
                    <i style={{ color: "green", padding: "0px 5px" }} onClick={e => { this.props.updateUser(data) }} className="cui-pencil icons font-xl"></i>
                    <i style={{ color: "red", padding: "0px 5px" }} onClick={e => { this.toggleSmall(data.userId) }} className="cui-trash icons font-xl"></i>
                </td>
            </tr>)
        })
    }
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
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Date Registered</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showUserList()}
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
                            Are You Sure You Want To Delete This User?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.deleteUser}>Yes</Button>{' '}
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
        userDetails: state.userDetail.userDetails,
        userDeleted: state.userDetail.userDeleted
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteUserData: (value) => dispatch(deleteUserData(value)),
        updateUser: (value) => dispatch(updateUser(value)),
        GetUserList: () => dispatch(GetUserList())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
