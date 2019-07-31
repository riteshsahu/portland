import React, { Component } from 'react';
import { Badge, Modal, ModalBody, ModalFooter, Button, Col, Pagination,Label, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { deleteUserData, updateUser, GetUserList } from '../userDetail.action';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roleKey: {
                1: "Admin",
                2: "Management",
                3: "Internal Employee",
                4: "External Employee",
                5: "Designer",
                6: "Client"
            },
            small: false,
            deleteIndex: '',
            toggle1: false,
            selectedIndex: ''
        }
        this.toggleSmall = this.toggleSmall.bind(this);
        this.toggleModel = this.toggleModel.bind(this);

    }


    componentDidMount = () => {
        this.props.GetUserList();
    }

    componentWillReceiveProps = () => {
        if (this.props.userDeleted) {
            this.props.GetUserList();

        }
    }
    toggleSmall(i) {
        this.setState({
            deleteIndex: i,
            small: !this.state.small,
        });
    }

    toggleModel(i) {
        console.log("button clicked")
        this.setState({
            selectedIndex: i,
            toggle1: !this.state.toggle1,
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
        if (this.props.userDetails.length > 0) {
            this.props.userDetails.map((data, i) => {
                result.push(<tr>
                    <td><a href="javascript:void(0)" onClick={e => { this.toggleModel(data.userId) }}>{data.firstName} </a></td>
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
        console.log("selected index", this.state.selectedIndex)
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
                <Row>
                    <Modal isOpen={this.state.toggle1} toggle={this.toggleModel }
                        className={'modal-sm ' + this.props.className}>
                           {(this.props.userDetails.length > 0) && this.props.userDetails.map((data, i) =>
                            (this.state.selectedIndex== data.userId) &&
                            <ModalBody>
                                <div>
                                    <Row>
                                        <Col xs="12" md="4" lg="4">
                                        <Label> First Name:-</Label>
                                        </Col>
                                        <Col xs="12" md="4" lg="4">
                                        <Label> {data.firstName}</Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="4" lg="4">
                                        <Label> Last Name:-</Label>
                                        </Col>
                                        <Col xs="12" md="4" lg="4">
                                        <Label> {data.lastName}</Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="4" lg="4">
                                        <Label> Email:-</Label>
                                        </Col>
                                        <Col xs="12" md="4" lg="4">
                                        <Label> {data.email}</Label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" md="4" lg="4">
                                        <Label> Role:-</Label>
                                        </Col>
                                        <Col xs="12" md="4" lg="4">
                                        <Label> {this.state.roleKey[data.role]}</Label>
                                        </Col>
                                    </Row>
                                </div>
                            </ModalBody>)}
                        <ModalFooter>
                            <Button color="primary" onClick={e=>{this.toggleModel("")}} >Exit</Button>
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
