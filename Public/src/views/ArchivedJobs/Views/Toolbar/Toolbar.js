import React, { Component } from 'react';
import { connect } from "react-redux";
import './Toolbar.css';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Col, Label, Row, Input, Badge } from 'reactstrap';
import { getJobParticipants, createNewPrivateChatRoom, getPrivateChatData } from '../../../ArchivedJobs/action.archivedJobs';

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
      },
      activeTab: false
    }
    this.toggleModel = this.toggleModel.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
  }

  componentDidMount = () => {
    // var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
    // this.props.getPrivateChatData(this.props.params.id, USER_DETAILS[0].userId)
    // check if user can see role tab specified by roleKey
    if (this.props.params.roleKey) {
    //   let USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
    //   if (USER_DETAILS[0].role <= this.props.params.roleKey) {
        this.setState({
          activeTab: this.props.params.roleKey
        });
    //   } else {
    //     this.props.history.push("/activeJobs/" + this.props.params.id);
    //   }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.selectedJobId !== nextProps.JobId) {
      // this.props.getJobParticipants(nextProps.JobId);
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

  getUniqueId = () => {
    var length = 13;
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return (result);
  }

  handlePrivateChat = (data) => {
    var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
    let uniquePrivateChatId = this.getUniqueId();
    let cName = USER_DETAILS[0].firstName + " " + data.firstName + " " + "Chat"
    let values = {
      privateChatId: uniquePrivateChatId,
      jobId: data.jobId,
      privateChatFor: data.userId,
      createAt: new Date(),
      createBy: USER_DETAILS[0].userId,
      chatName: cName
    }
    this.props.createNewPrivateChatRoom(values);
    this.props.history.push("/privateChat/" + uniquePrivateChatId)

  }

  routeMainChat = () => {
    this.setState({
      activeTab: 0
    });

    this.props.history.push("/activeJobs/" + this.props.JobId);
  }

  routeRoleChat = (roleKey) => {
    this.setState({
      activeTab: roleKey
    });

    this.props.history.push(`/activeJobs/${this.props.JobId}/roleChat/${roleKey}`);
  }

  isChatCreated = (id) => {
    let count = 0;
    if (this.props.privateChatData && this.props.privateChatData.length > 0) {
      this.props.privateChatData.map(dt => {
        if (dt.createBy == id || dt.privateChatFor == id) {
          count = count + 1;
        }
      })
    }

    if (!count) {
      return false
    }
    return true;
  }

  chatTabsHandler = () => {
    // var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';

    let tabs = [];
    // tabs.push(
    //   <Badge onClick={() => this.routeMainChat()} className={"Badge " + (this.state.activeTab === 0 ? 'Active' : "")}><Label className="BadgeLabel">All</Label></Badge>
    // )

    Object.keys(this.state.KeyRole).forEach(roleKey => {
      // if (USER_DETAILS[0].role <= roleKey) {
        tabs.push(
          <Badge onClick={() => this.routeRoleChat(roleKey)} className={"Badge " + (this.state.activeTab === roleKey ? 'Active' : "")}><Label className="BadgeLabel">{this.state.KeyRole[roleKey]}</Label></Badge>
        )
      // }
    })

    return tabs;
  }

  render() {
    const { leftItems, rightItems } = this.props;
    var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
    return (
      <>
        <div className="toolbar">
          <div ><h3 className="jobtitle" >{this.props.JobTitle ? this.props.JobTitle : leftItems}</h3></div>
          {this.chatTabsHandler()}
          {/* <Badge style={{borderRadius: "20px",margin: "10px"}} color="warning"><Label style={{marginTop: "8px"}}>{this.props.privateChatData.length>0 ? this.props.privateChatData[0].chatName: ""}</Label></Badge> */}

          {/* <h1 className="toolbar-title">{title}</h1> */}
          <div className="right-items" >
            <Label style={{ cursor: "pointer", marginTop: 4 }} onClick={this.handleParticipants}>
              {<i
                style={{ marginTop: 5, marginRight: 5, marginLeft: 5 }}
                className="fa fa-users">
              </i>
              }
              {rightItems}
            </Label>
            {this.props.userRole != 6
              ?
              <Button style={{ background: "#ff8f00", color: "white" }}
                onClick={this.handleAnswer}

              >
                Answer
            </Button>
              : null
            }

          </div>
        </div>
        {/*  */}

        <Modal isOpen={this.state.Model} toggle={this.toggleModel}
          className={'modal-sm ' + this.props.className}>
          <ModalHeader>Participants</ModalHeader>
          <ModalBody style={{ padding: 0 }}>

            {(this.props.ParticipantsDetails.length > 0) && this.props.ParticipantsDetails.map((data, i) =>

              <>
                <Row key={i} style={{ padding: "5 0px" }} >
                  <Col style={{ padding: "0 30px" }} xs="6" sm="6" md="6" lg="6">
                    <Label style={{ marginBottom: 0, height: 45 }}> {this.state.KeyRole[data.role] + "-" + data.firstName} </Label> <br />
                  </Col>
                  <Col xs="6" sm="6" md="6" lg="6" >
                    {!(data.userId == USER_DETAILS[0].userId) &&
                      <Button
                        disabled={this.isChatCreated(data.userId)}
                        style={{ marginTop: 5, marginBottom: 5 }} onClick={() => { this.handlePrivateChat(data) }} color="success">Private Chat</Button>
                    }
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
    ParticipantsDetails: state.ActiveJobDetail.ParticipantsDetails,
    privateChatData: state.ActiveJobDetail.privateChatData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // getJobParticipants: (id) => dispatch(getJobParticipants(id)),
    createNewPrivateChatRoom: (data) => dispatch(createNewPrivateChatRoom(data)),
    // getPrivateChatData: (jobId, userId) => dispatch(getPrivateChatData(jobId, userId))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
