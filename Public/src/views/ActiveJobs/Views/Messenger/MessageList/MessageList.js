import React, { Component } from 'react';
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";

import './MessageList.css';
import Messages from '../Message/Messages';
import Toolbar from '../Toolbar/Toolbar';
import { GetChatHistory } from '../../../action.activeJobs';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      isVisibleToClient: 0,
      KeyRole: {
        1: "Admin",
        2: "Management",
        3: "Internal Employee",
        4: "External Employee",
        5: "Designer",
        6: "Client"
      }
    };
  }

  ws = socketIOClient(window.location.hostname);
  // ws = socketIOClient('http://localhost:5000')

  componentDidMount() {
    var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
    var JobId = this.props.params.id;
    this.props.GetChatHistory(JobId);

    let subscribe = {
      room: window.location.href.split('/').pop(),
      userId: USER_DETAILS[0].userId
    }
    this.ws.emit('subscribe', subscribe);

    this.ws.on("response", evt => {
      // console.log('evt', evt)
      if ((USER_DETAILS[0].role !== 6) || (USER_DETAILS[0].role === 6 && evt.isVisibleToClient)) {
        const message = evt;
        this.addMessage(message)
      }

    });
  }


  componentDidUpdate(prevProps) {
    var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
    // console.log(prevProps.ActiveJobDetail.JobId, "job id in props");
    // console.log(this.props.params.id,"props wali id");
    // if(prevProps.ActiveJobDetail.JobId)
    if (prevProps.ActiveJobDetail.JobId != this.props.params.id) {
      this.props.GetChatHistory(this.props.params.id);
    }
    let subscribe = {
      room: window.location.href.split('/').pop(),
      userId: USER_DETAILS[0].userId
    }
    this.ws.emit('subscribe', subscribe);
    if (this.props.ActiveJobDetail) {
      if (this.props.ActiveJobDetail.JobId !== prevProps.ActiveJobDetail.JobId) {
        this.ws.emit('subscribe', window.location.href.split('/').pop());
        this.setState({
          messages: []
        })
      }
    }

    if (this.props.chatHistory.length > 0 && prevProps.chatHistory != this.props.chatHistory) {
      let messages = [];
      this.props.chatHistory.map((data, index) => {
        let fromMe = (data.createBy == USER_DETAILS[0].userId) ? true : false
        if (USER_DETAILS[0].role == 6 && data.isVisibleToClient == 1) {
          messages.push({
            // isVisibleToClient: data.isVisibleToClient,
            // room: window.location.href.split('/').pop(),
            // userId: data.createBy,
            author: this.state.KeyRole[data.role] + "-" + data.firstName,
            fromMe: fromMe,
            message: data.message,
            timestamp: new Date().getTime()
          })
        } else if (USER_DETAILS[0].role != 6) {
          messages.push({
            // isVisibleToClient: data.isVisibleToClient,
            // room: window.location.href.split('/').pop(),
            // userId: data.createBy,
            author: this.state.KeyRole[data.role]+ "-" + data.firstName,
            fromMe: fromMe,
            message: data.message,
            timestamp: new Date().getTime()
          })
        }

      })
      // console.log("--messages list from props---", messages);
      this.setState({
        messages: messages,
      })
    }
  }

  isValidMessage = () => {
    return this.state.message.trim()
  }


  addMessage = message => {
    let tempArr = this.state.messages;
    tempArr.push({
      author: message.author,
      message: message.message,
      fromMe: false,
      timestamp: new Date().getTime()
    });
    this.setState({ messages: tempArr, isVisibleToClient: message.isVisibleToClient })

  }


  keyPressed = (event) => {
    if (event.key === "Enter") {
      if (event.target.value !== '') {
        this.submitMessage()
      }
    }
  }


  handleAnswerInput = (value) => {
    this.setState({
      isVisibleToClient: 1,
      message: value
    })
  }


  submitMessage = () => {
    var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';

    let tempArr = this.state.messages;
    if (this.isValidMessage()) {
      tempArr.push({
        author: USER_DETAILS[0].firstName,
        message: this.state.message,
        fromMe: true,
        timestamp: new Date().getTime()
      });
      const message = {
        isVisibleToClient: this.state.isVisibleToClient,
        userId: USER_DETAILS[0].userId,
        message: this.state.message,
        room: window.location.href.split('/').pop(),
        author: USER_DETAILS[0].firstName
      }
      this.ws.emit('send message', message)
      this.setState({
        messages: tempArr,
        message: "",
        isVisibleToClient: 0
      });
    }
  }


  render() {
    // console.log("Messages from API", this.props.chatHistory)
    var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';

    return (
      <div >
        <Toolbar
          leftItems="Job Title"
          rightItems="Participants"
          handleClientAnswer={this.submitMessage}
          handleAnswerInput={this.handleAnswerInput}
          userRole={USER_DETAILS[0].role}
        />
        <Messages messages={this.state.messages} />

        <div className="compose">
          <input
            type="text"
            className="compose-input"
            placeholder="Type a message"
            onChange={e => { this.setState({ message: e.target.value }) }}
            value={this.state.message}
            onKeyPress={e => this.keyPressed(e)}
          />
          <i
            style={{ color: "#44c372", fontSize: "x-large", margin: "7px 15px 0px" }}
            onClick={this.submitMessage}
            className="fa fa-paper-plane">
          </i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ActiveJobDetail: state.ActiveJobDetail,
    chatHistory: state.ActiveJobDetail.chatHistory,
    isChatUpdated: state.ActiveJobDetail.isChatUpdated
  };
}
function mapDispatchToProps(dispatch) {
  return {
    GetChatHistory: (id) => dispatch(GetChatHistory(id))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
