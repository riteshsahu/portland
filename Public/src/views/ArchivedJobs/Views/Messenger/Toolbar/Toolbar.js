import React, { Component } from 'react';
import { connect } from "react-redux";
import './Toolbar.css';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Col, Label, Row, Input } from 'reactstrap';
import { getJobParticipants } from '../../../action.archivedJobs';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isJobIdUpdated: true,
      selectedJobId: '',
      jobTitle: '',
      Model: false,
      primary: false,
      answer: '',
      KeyRole: {
        1: "Admin",
        2: "Management",
        3: "Internal Employee",
        4: "External Employee",
        5: "Designer",
        6: "Client"
      }
    }
    this.toggleModel = this.toggleModel.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);

  }

  componentDidMount = () => {
    this.props.getJobParticipants(this.props.JobId);
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.selectedJobId !== nextProps.JobId) {
      this.props.getJobParticipants(nextProps.JobId);
      this.setState({
        isJobIdUpdated: false,
        selectedJobId: nextProps.JobId,
        jobTitle: nextProps.JobTitle
      })
    }
  }

  handleParticipants = () => {
    this.setState({
      Model: !this.state.Model,
    });

  }

  handleAnswer = () => {
    this.setState({
      primary: !this.state.primary
    })
  }

  handleAnswerInput = (e) => {
    this.setState({
      answer: e.target.value
    })
    //this.props.handleAnswerInput(e.target.value);
  }

  toggleModel() {
    this.setState({
      Model: !this.state.Model,
    });
  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary,
    });
  }

  handleSumbit = () => {
    this.togglePrimary();
    this.props.handleClientAnswer(this.state.answer);
  }

  keyPressed = (event) => {
    if (event.key === "Enter") {
      this.handleSumbit()
    }
  }
  render() {
    const { leftItems, rightItems } = this.props;
    return (
      <>
        <div className="toolbar">
          <div ><h3 className="jobtitle" >{this.state.jobTitle ? this.state.jobTitle : leftItems}</h3></div>
          {/* <h1 className="toolbar-title">{title}</h1> */}
          <div className="right-items" >

            <Label style={{ cursor: "pointer", marginTop: 4 }} onClick={this.handleParticipants}>
              { <i 
                  style={{ marginTop: 5, marginRight: 5, marginLeft: 5 }} 
                  className="fa fa-users">
                </i>
              }
              {rightItems}
            </Label>
            {/* { this.props.userRole != 6
              ?
              <Button  style={{background: "#ff8f00", color: "white"}}
              onClick={this.handleAnswer} 
              
            >
              Answer
            </Button> 
            : null
            } */}
            
          </div>
        </div>

        <Modal isOpen={this.state.Model} toggle={this.toggleModel}
          className={'modal-sm ' + this.props.className}>
          <ModalHeader>Participants</ModalHeader>
          <ModalBody style={{ padding: 0 }}>
            {(this.props.ParticipantsDetails.length > 0) && this.props.ParticipantsDetails.map((data, i) =>
              <>
                <Row key={i} style={{ padding: "5 0px" }} >
                  <Col style={{ padding: "0 30px" }} xs="6" sm="6" md="6" lg="6">
                     <Label style={{ marginBottom: 0 }}> {this.state.KeyRole[data.role]+ "-" + data.firstName} </Label> <br />
                    {/* <Label style={{ marginBottom: 0 }}> {data.firstName} {data.lastName}</Label> <br />
                    <Label style={{ color: "grey", fontSize: 12, marginBottom: 0 }}> {data.email}</Label> */}
                  </Col>
                  <Col xs="6" sm="6" md="6" lg="6" >
                    <Button style={{ marginTop: 5, marginBottom: 5 }} color="success">Private Chat</Button>
                  </Col>
                </Row>
                <hr style={{ marginTop: 0, marginBottom: 0 }} />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModel} >Exit</Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.primary} toggle={this.togglePrimary}
          className={'modal-primary ' + this.props.className}>
          <ModalBody>
            <Input
              type="textarea"
              rows={4}
              placeholder="Answer Here"
              onKeyPress={(e) => this.keyPressed(e)}
              onChange={this.handleAnswerInput}
            />
            <Button
              style={{ float: "right", marginTop: 10 }}
              color="primary"
              onClick={this.handleSumbit}
            >
              Send
            </Button>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    JobId: state.ActiveJobDetail.JobId,
    JobTitle: state.ActiveJobDetail.JobTitle,
    ParticipantsDetails: state.ActiveJobDetail.ParticipantsDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getJobParticipants: (id) => dispatch(getJobParticipants(id))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

