import React, { Component } from 'react';
import { connect } from "react-redux";
import './Toolbar.css';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button,Badge, Col, Label, Row, Input } from 'reactstrap';
import { getJobParticipants,createNewPrivateChatRoom } from '../../../action.privateChat';

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
      activeTab: 0,
      jobIdforPC: '',
      privateChatName: ''
    }
    this.toggleModel = this.toggleModel.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);

  }

  componentDidMount = () => {
    // this.props.getJobParticipants(this.props.JobId);
    let urlId= this.props.params.id;


    if (this.props.privateChatData && this.props.privateChatData.length> 0) {
      this.props.privateChatData.map((data,i) => {
          if (data.privateChatId == urlId){
            this.setState({
              jobIdforPC: data.jobId,
              privateChatName: data.chatName
            })
    }
      })
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

  handlePrivateChat=(data) => {
    var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
    let uniquePrivateChatId= Date.now();
    let values= {
      privateChatId: uniquePrivateChatId,
      jobId:data.jobId,
      privateChatFor:data.userId,
      createAt:new Date(),
      createBy: USER_DETAILS[0].userId
    }
    this.props.createNewPrivateChatRoom(values);
    this.props.history.push("/privateChat/"+uniquePrivateChatId)
  }

  routeMainChat = () => {
    this.setState({
      activeTab: 0
    });

    this.props.history.push("/activeJobs/" + this.props.JobId)
  }

  routePrivateChat = (roleKey) => {
    this.setState({
      activeTab: roleKey
    });
    this.props.history.push('/privateChat/' + roleKey);
  }

  chatTabsHandler = () => {
    let tabs = [];
    tabs.push(
      <Badge onClick={() => this.routeMainChat()} className={"Badge " + (this.state.activeTab === 0 ? 'Active' : "")}><Label className="BadgeLabel">All</Label></Badge>
    )

    Object.keys(this.state.KeyRole).forEach(roleKey => {
      tabs.push(
        <Badge onClick={() => this.routePrivateChat(roleKey)} className={"Badge " + (this.state.activeTab === roleKey ? 'Active' : "")}><Label className="BadgeLabel">{this.state.KeyRole[roleKey]}</Label></Badge>  
      )
    })

    return tabs;
  }

  render() {
    const { title, leftItems, rightItems } = this.props;
    var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
    return (
      <>
        <div className="toolbar">
          <div ><h3 className="jobtitle" >{this.props.chatName}</h3></div>
          {this.chatTabsHandler()}
          {/* <h1 className="toolbar-title">{title}</h1> */}
          <div className="right-items" >
          {/* <Badge style={{borderRadius: "20px"}} color="warning"><Label style={{marginTop: "8px"}}>Admin Client Chat</Label></Badge> */}
            {/* <Label style={{ cursor: "pointer", marginTop: 4 }} onClick={this.handleParticipants}>
              { <i
                  style={{ marginTop: 5, marginRight: 5, marginLeft: 5 }} 
                  className="fa fa-users">
                </i>
              }
              {rightItems}
            </Label> */}
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
        {/*  */}

        <Modal isOpen={this.state.Model} toggle={this.toggleModel}
          className={'modal-sm ' + this.props.className}>
          <ModalHeader>Participants</ModalHeader>
          <ModalBody style={{ padding: 0 }}>
            {(this.props.ParticipantsDetails.length > 0) && this.props.ParticipantsDetails.map((data, i) =>
           
              <>
                <Row key={i} style={{ padding: "5 0px" }} >
                  <Col style={{ padding: "0 30px" }} xs="6" sm="6" md="6" lg="6">
                     <Label style={{ marginBottom: 0,height:45 }}> {this.state.KeyRole[data.role]+ "-" + data.firstName} </Label> <br />
                  </Col>
                  <Col xs="6" sm="6" md="6" lg="6" >
                   { !(data.userId==USER_DETAILS[0].userId) &&
                    <Button style={{ marginTop: 5, marginBottom: 5 }} onClick={()=>{this.handlePrivateChat(data)}}  color="success">Private Chat</Button>
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
    privateChatId: state.PrivateChatDetail.privateChatId,
    chatName: state.PrivateChatDetail.chatName,
    JobId: state.PrivateChatDetail.JobId,
    ParticipantsDetails: state.ActiveJobDetail.ParticipantsDetails,
    privateChatData: state.ActiveJobDetail.privateChatData,
    JobId: state.PrivateChatDetail.JobId,
    JobTitle: state.PrivateChatDetail.JobTitle,
    // ParticipantsDetails: state.PrivateChatDetail.ParticipantsDetails,
    // privateChatData: state.PrivateChatDetail.privateChatData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // getJobParticipants: (id) => dispatch(getJobParticipants(id)),
    createNewPrivateChatRoom: (data) => dispatch(createNewPrivateChatRoom(data))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

