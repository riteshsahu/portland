import React, { Component } from 'react';
import { Badge, Modal, ModalBody, ModalFooter, Button, Col, Pagination,Label, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { connect } from "react-redux";
import { deleteUserData, updateUser, GetUserList } from '../userDetail.action';
import '../user.css';
import PaginationComponent  from 'react-reactstrap-pagination';

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
            selectedIndex: '',
            offset: 0,
            selectedPage: 1,
        }
        this.toggleSmall = this.toggleSmall.bind(this);
        this.toggleModel = this.toggleModel.bind(this);

    }


    componentDidMount = () => {
        this.props.GetUserList(this.state.offset);
    }

    componentWillReceiveProps = () => {
        if (this.props.userDeleted) {
            this.props.GetUserList(this.state.offset);

        }
    }
    toggleSmall(i) {
        this.setState({
            deleteIndex: i,
            small: !this.state.small,
        });
    }

    toggleModel(i) {
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

    handleSelected = (selectedPage) => {
        this.setState({ selectedPage: selectedPage });
        let offset= (selectedPage - 1) * 10;
        this.props.GetUserList(offset);
    }
         

    showUserList = () => {
        let result = [];
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));

        if (this.props.userDetails && this.props.userDetails.length > 0) {
            this.props.userDetails.map((data, i) => {
                result.push(<tr>
                    {/* <td><a href="javascript:void(0)" onClick={e => { this.toggleModel(data.userId) }}>{data.firstName} </a></td> */}
                    <td>{data.firstName} </td>
                    <td>{data.lastName}</td>
                    <td>{data.email}</td>
                    <td>{data.createAt}</td>
                    <td>{this.state.roleKey[data.role]}</td>
                    <td>
                        <Badge color="success">Active</Badge>
                    </td>
                    <td>
                        <i onClick={e => { this.props.updateUser(data) }} className="cui-pencil icons editButton font-xl"></i>
                     {userDetails[0].role == 1 ? <i  onClick={e => { this.toggleSmall(data.userId) }} className="cui-trash icons deleteButton font-xl"></i> : null}   
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
                        <div style={{marginLeft: "30%",marginTop: "20px"}}>
                        <PaginationComponent totalItems={this.props.count} pageSize={10} 
                        onSelect={this.handleSelected}
                        activePage={this.state.selectedPage} />
                        </div>
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
                            (this.state.selectedIndex === data.userId) &&
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
        userDeleted: state.userDetail.userDeleted,
        count: state.userDetail.count
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteUserData: (value) => dispatch(deleteUserData(value)),
        updateUser: (value) => dispatch(updateUser(value)),
        GetUserList: (offset) => dispatch(GetUserList(offset))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
