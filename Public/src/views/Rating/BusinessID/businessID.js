import React, { Component } from 'react';
import { Input, Button, Row, Col,Modal,ModalBody } from 'reactstrap';

class BusinessId extends Component {
    constructor(props) {
        super(props);
        this.state = {
            okToggle: false,
            modelToggle: false,
            otpModel: false
        }
    }

    handleOk = () => {
        this.setState({
            okToggle: !this.state.okToggle,
            
        })
    }

    handleEdit = () => {
        this.setState({
            modelToggle: !this.state.modelToggle
        })
    }
    toggleSmall = () => {
        this.setState({
            modelToggle : !this.state.modelToggle
        })
    }

    toggleNew = () => {
        this.setState({
            otpModel : !this.state.otpModel
        })
    }

    openOtpModel = () => {
        this.toggleSmall();
        this.setState({
            otpModel : !this.state.otpModel
        })
    }

    enableBusinessId=() => {
        this.toggleNew();
        this.setState({
            okToggle: !this.state.okToggle,
        })
    }
    render() {
        return (
            <>
            <Row style={{ margin: 10, marginLeft: 270 }}>
                <Col xs="12" sm="6" md="4">
                    <Input type="text" placeholder="Business ID" disabled={this.state.okToggle}></Input>
                </Col>

                <Col xs="12" sm="6" md="3">
                    <Button className="btn btn-success" onClick={this.handleOk}  disabled={this.state.okToggle}>Ok</Button>
                    <Button style={{ marginLeft: 10 }} onClick={this.handleEdit}className="btn btn-info">Edit</Button>
                </Col>

            </Row>

            <Modal style={{width: 300, height: 250}} isOpen={this.state.modelToggle} toggle={this.toggleSmall}>
                <ModalBody>
                    <Input type="text" placeholder="Username" ></Input> 
                    <Input style={{marginTop:10}} type="password" placeholder="Password" ></Input>
                    <Row style={{ float: "right", marginRight: 0, marginTop: 10 }}>
                        <Button className=" btn btn-info"  onClick={this.openOtpModel}>OK</Button> &nbsp;
             <Button className=" btn btn-secondary" onClick={this.toggleSmall}>Cancel</Button>
                    </Row>
                </ModalBody>
            </Modal>

            <Modal style={{width: 300, height: 250}} isOpen={this.state.otpModel} toggle={this.toggleNew}>
                <ModalBody>
                    <Input type="number" placeholder="OTP" ></Input> 
                    <Row style={{ float: "right", marginRight: 0, marginTop: 10 }}>
                        <Button className=" btn btn-info" onClick={this.enableBusinessId}>OK</Button> &nbsp;
             <Button className=" btn btn-secondary" onClick={this.toggleNew}>Cancel</Button>
                    </Row>
                </ModalBody>
            </Modal>
            </>
        )
    }
}

export default BusinessId; 