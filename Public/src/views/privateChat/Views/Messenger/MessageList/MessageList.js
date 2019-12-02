import React, { Component } from 'react';
import { connect } from "react-redux";
import './MessageList.css';
import Messages from '../Message/Messages';
import Toolbar from '../Toolbar/Toolbar';
import { getChatHistory } from '../../../action.activeJobs';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { getUserJobs} from '../../../../../containers/DefaultLayout/action.defaultLayout';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      isVisibleToClient: 0,
      showEmojiPicker: false,
      newMessage: '',
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
  triggerInputFileContract = () => this.fileInputContract.click();

  componentDidMount() {
    var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
    var JobId = this.props.params.id;
    this.props.getChatHistory(JobId);
    let privateChatId = this.props.params.id;
    let jobId ="";
    if (this.props.privateChatData && this.props.privateChatData.length> 0) {
      this.props.privateChatData.map(dt=>{
          if(dt.privateChatId == privateChatId ){
            jobId = dt.jobId
          }
      })
    }
    if (USER_DETAILS) {
      let subscribe = {
        room: window.location.href.split('/').pop(),
        userId: USER_DETAILS[0].userId,
        privateChat: true,
        jobId: jobId
      }
  
      // subscirbe user to this chat and unsubscibe him from all other chats
      window.clientSocket.emit('subscribe', subscribe);
  
      window.clientSocket.on("response", evt => {
        if ((USER_DETAILS[0].role !== 6) || (USER_DETAILS[0].role === 6 && evt.isVisibleToClient)) {
          const message = evt;
          this.addMessage(message)
        }
  
      });
    }
  }


  componentDidUpdate(prevProps) {
    var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
    if (prevProps.ActiveJobDetail.JobId != this.props.params.id) {
      this.props.getChatHistory(this.props.params.id);
    }
    let subscribe = {
      room: window.location.href.split('/').pop(),
      userId: USER_DETAILS[0].userId
    }

    // subscirbe user to this chat and unsubscibe him from all other chats
    if (this.props.ActiveJobDetail) {
      if (this.props.ActiveJobDetail.JobId !== prevProps.ActiveJobDetail.JobId) {
        window.clientSocket.emit('subscribe', subscribe);
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
            author: this.state.KeyRole[data.role] + "-" + data.firstName,
            fromMe: fromMe,
            message: data.message,
            timestamp: new Date().getTime()
          })
        }

      })
      this.setState({
        messages: messages,
      })
    }
  }

  componentWillUnmount() {
    var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';

    if (USER_DETAILS) {
      let unsubscribe = {
        room: window.location.href.split('/').pop(),
        userId: USER_DETAILS[0].userId
      }
      
      // unsubscirbe user to this chat and unsubscibe him from all other chats
      window.clientSocket.emit('unsubscribe', unsubscribe);
    }
  }

  isValidMessage = (value) => {
    return this.state.message.trim() || value.trim() 
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

  toggleEmojiPicker = () => {
    this.setState({
      showEmojiPicker: !this.state.showEmojiPicker,
    });
  }

  addEmoji = (emoji) => {
    const { newMessage } = this.state;
    const text = `${newMessage}${emoji.native}`;

    this.setState({
      newMessage: text,
      showEmojiPicker: false,
    });
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

  submitMessage = (value) => {
    var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
    this.props.getUserJobs(USER_DETAILS[0].userId);

    let tempArr = this.state.messages;
    if (this.isValidMessage(value)) {
      tempArr.push({
        author: USER_DETAILS[0].firstName,
        message: value || this.state.message,
        fromMe: true,
        timestamp: new Date().getTime()
      });
      const message = {
        isVisibleToClient: this.state.isVisibleToClient,
        userId: USER_DETAILS[0].userId,
        message: value || this.state.message,
        room: window.location.href.split('/').pop(),
        author: USER_DETAILS[0].firstName,
        privateChat: true
      }
      window.clientSocket.emit('send message', message)
      this.setState({
        messages: tempArr,
        message: "",
        isVisibleToClient: 0
      });
    }
  }


  render() {
    var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
    return (
      <div >

        <Toolbar
          params={this.props.params} 
          leftItems="Private Chat"
          rightItems="Participants"
          handleClientAnswer={(value) => this.submitMessage(value)}
          userRole={USER_DETAILS[0].role}
          history={this.props.history}
        />

        <Messages messages={this.state.messages} />

        <div className="compose">

          <textarea
            rows={1}
            className="compose-input"
            placeholder="Type a message"
            onChange={e => { this.setState({ message: e.target.value }) }}
            value={this.state.message}
            onKeyPress={e => this.keyPressed(e)}
          />
          <input style={{ display: "none" }}
            ref={fileInputContract => this.fileInputContract = fileInputContract}
            type="file" accept="application/pdf" id="fileInputContract" onChange={this.handleContractFile} />

          <i style={{ color: "yellow", fontSize: "x-large", flexDirection: "row-reverse", marginTop: "7px", marginLeft: "3px" }}
            className="fa fa-smile-o" onClick={this.toggleEmojiPicker}></i>
          <i style={{ color: "grey", fontSize: "x-large", flexDirection: "row-reverse", marginTop: "7px", marginLeft: "3px" }}
            onClick={this.triggerInputFileContract} className="fa fa-paperclip"></i>
          <i style={{ color: "#44c372", fontSize: "x-large", flexDirection: "row-reverse", margin: "7px 15px 0px", width: "3%" }}
            onClick={()=>{this.submitMessage()}} className="fa fa-paper-plane"></i>
        </div>
        {this.state.showEmojiPicker ? (
          <div className="toggle-emoji"><Picker set="emojione" onSelect={this.addEmoji} /> </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ActiveJobDetail: state.ActiveJobDetail,
    chatHistory: state.ActiveJobDetail.chatHistory,
    isChatUpdated: state.ActiveJobDetail.isChatUpdated,
    privateChatData: state.ActiveJobDetail.privateChatData
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getChatHistory: (id) => dispatch(getChatHistory(id)),
    getUserJobs: (id) => dispatch(getUserJobs(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
