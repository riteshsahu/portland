import React, { Component } from 'react';
import { Input, Row, Modal, ModalBody, Button } from 'reactstrap';
import './reviewResponse.css';

class ReviewResponse extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Row>
                <Modal isOpen={this.props.small} toggle={this.props.toggleSmall}>
                    <ModalBody>
                        <Input style={{ height: 100 }} type="textarea" placeholder="Write Your Message Here" ></Input>
                        <Row style={{ float: "right", marginRight: 0, marginTop: 5 }}>
                            <Button className="buttonPadding btn btn-info" onClick={this.props.toggleSmall}>Send</Button> &nbsp;
                            <Button className="buttonPadding btn btn-secondary" onClick={this.props.toggleSmall}>Cancel</Button>
                        </Row>
                    </ModalBody>
                </Modal>
            </Row> 
        )
    }
}

export default ReviewResponse;