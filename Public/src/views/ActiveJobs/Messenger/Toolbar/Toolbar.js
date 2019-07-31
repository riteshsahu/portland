import React, { Component } from 'react';
import { connect } from "react-redux";
import './Toolbar.css';
import { Badge, Modal, ModalBody,ModalHeader, ModalFooter, Button, Col, Pagination,Label, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {GetJobParticipants} from '../../reducer/action.activeJobs';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isJobIdUpdated: true
    }
    this.toggleModel = this.toggleModel.bind(this);

  }


  componentWillReceiveProps=(nextProps) => {
    console.log("hello")
    console.log(nextProps.JobId,"jobId for this job")
    if(this.state.isJobIdUpdated){
      this.props.GetJobParticipants(nextProps.JobId);
      this.setState({
        isJobIdUpdated: false,
        Model:false
      })
    }
  }

  handleParticipants = () => {
    console.log("Button Clicked")
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
    // console.log(this.props.JobId,"jobId for this job")
    console.log("Participants",this.props.ParticipantsDetails);

    const { title, leftItems, rightItems } = this.props;
    return (
      <>
      <div className="toolbar">
        <div className="left-items">{leftItems}</div>
        <h1 className="toolbar-title">{title}</h1>
        <div className="right-items" onClick={this.handleParticipants}>{rightItems}</div>
      </div>

      <Modal isOpen={this.state.Model} toggle={this.toggleModel }
                        className={'modal-sm ' + this.props.className}>
                          <ModalHeader>Participants</ModalHeader>
                            <ModalBody style={{padding: 0}}>
                            {(this.props.ParticipantsDetails.length > 0) && this.props.ParticipantsDetails.map((data, i) =>
                                    <Row >
                                        <Col style={{padding: "0 30px"}} xs="12" md="12" lg="12">
                                        <Label style={{marginBottom: 0}}> {data.firstName} {data.lastName}</Label> <br/>
                                        <Label style={{color: "grey",fontSize: 12,marginBottom: 0}}> {data.email}</Label>
                                        <hr/>
                                        </Col>
                                       </Row> )}
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
    ParticipantsDetails: state.ActiveJobDetail.ParticipantsDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GetJobParticipants: (id) => dispatch(GetJobParticipants(id))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

