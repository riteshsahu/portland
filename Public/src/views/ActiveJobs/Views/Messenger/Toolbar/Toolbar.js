import React, { Component } from 'react';
import { connect } from "react-redux";
import './Toolbar.css';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Col, Label, Row, } from 'reactstrap';
import { GetJobParticipants } from '../../../action.activeJobs';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isJobIdUpdated: true,
      selectedJobId: '',
      jobTitle: '',
      Model: false
    }
    this.toggleModel = this.toggleModel.bind(this);
  }


  componentWillReceiveProps = (nextProps) => {
    // console.log(nextProps.JobId,"jobId for this job"),
    // console.log("Value in props",nextProps)
    if (this.state.selectedJobId != nextProps.JobId) {
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

  toggleModel() {
    this.setState({
      Model: !this.state.Model,
    });
  }
  render() {
    // console.log("Participants",this.props.ParticipantsDetails);
    console.log("job Title of this job", this.state.jobTitle)
    const { title, leftItems, rightItems } = this.props;
    return (
      <>
        <div className="toolbar">
          <div className="left-items">{this.state.jobTitle}</div>
          <h1 className="toolbar-title">{title}</h1>
          <div className="right-items" onClick={this.handleParticipants}>{rightItems}</div>
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

