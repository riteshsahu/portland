import React, { Component } from 'react';
import { connect } from "react-redux";
import './Toolbar.css';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Col, Label, Row, Input } from 'reactstrap';
import { GetJobParticipants } from '../../../action.activeJobs';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isJobIdUpdated: true,
      selectedJobId: '',
      jobTitle: '',
      Model: false,
      primary: false,
      answer: ''
    }
    this.toggleModel = this.toggleModel.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);

  }


  componentWillReceiveProps = (nextProps) => {
    // console.log(nextProps.JobId,"jobId for this job"),
    // console.log("Value in props",nextProps)
    if (this.state.selectedJobId !== nextProps.JobId) {
      this.props.GetJobParticipants(nextProps.JobId);
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
    this.props.handleAnswerInput(e.target.value);
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
    console.log("answer", this.state.answer);
    this.props.handleClientAnswer();
  }

  keyPressed = (event) => {
    if (event.key === "Enter") {
      this.handleSumbit()
    }
  }
  render() {
    // console.log("Participants",this.props.ParticipantsDetails);
    // console.log("job Title of this job", this.state.jobTitle)
    const { title, leftItems, rightItems } = this.props;
    return (
      <>
        <div className="toolbar">
          <div className="left-items">{this.state.jobTitle ? this.state.jobTitle : leftItems}</div>
          <h1 className="toolbar-title">{title}</h1>
          <div className="right-items" >

            <Label style={{ cursor: "pointer", marginTop: 4 }} onClick={this.handleParticipants}>
              { <i 
                  style={{ marginTop: 5, marginRight: 5, marginLeft: 5 }} 
                  className="fa fa-users">
                </i>
              }
              {rightItems}
            </Label>
            { this.props.userRole != 6
              ?
              <Button  style={{background: "#ff8f00", color: "white"}}
              onClick={this.handleAnswer} 
              
            >
              Answer
            </Button> 
            : null
            }
            
          </div>
        </div>

        <Modal isOpen={this.state.Model} toggle={this.toggleModel}
          className={'modal-sm ' + this.props.className}>
          <ModalHeader>Participants</ModalHeader>
          <ModalBody style={{ padding: 0 }}>
            {(this.props.ParticipantsDetails.length > 0) && this.props.ParticipantsDetails.map((data, i) =>
              <>
                <Row key={i} style={{ padding: "5 0px" }} >
                  <Col style={{ padding: "0 30px" }} xs="12" md="6" lg="6">
                    <Label style={{ marginBottom: 0 }}> {data.firstName} {data.lastName}</Label> <br />
                    <Label style={{ color: "grey", fontSize: 12, marginBottom: 0 }}> {data.email}</Label>
                  </Col>
                  <Col xs="12" md="6" lg="6" >
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
              type="text"
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
    GetJobParticipants: (id) => dispatch(GetJobParticipants(id))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

