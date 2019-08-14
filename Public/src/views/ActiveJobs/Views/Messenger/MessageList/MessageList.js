import React, { Component } from 'react';
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";

import './MessageList.css';
import Messages from '../Message/Messages';
import Toolbar from '../Toolbar/Toolbar';

const USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:"",
      messages: [],
      isVisibleToClient: 0
    };
  }

  ws = socketIOClient(window.location.hostname);
  
  componentDidMount() {
    let subscribe = {
      room: window.location.href.split('/').pop(),
      userId: USER_DETAILS[0].userId
    }
    this.ws.emit('subscribe', subscribe);

    this.ws.on("response", evt => {
      console.log('evt', evt)
      if((USER_DETAILS[0].role !== 6) || (USER_DETAILS[0].role === 6 && evt.isVisibleToClient)) {
        const message = evt;
        this.addMessage(message)
      }
      
    }); 
  }

  componentWillReceiveProps(nextProps) {
    console.log('next props---', nextProps)
  }

  componentDidUpdate(prevProps) {
    let subscribe = {
      room: window.location.href.split('/').pop(),
      userId: USER_DETAILS[0].userId
    }
    this.ws.emit('subscribe', subscribe);
    if(this.props.ActiveJobDetail) {
      if(this.props.ActiveJobDetail.JobId !== prevProps.ActiveJobDetail.JobId) {
        this.ws.emit('subscribe', window.location.href.split('/').pop());
        this.setState({
          messages: []
        })
      }
    }
  }

  isValidMessage=() => {
    return this.state.message.trim()
  }
  

  addMessage = message => {
    let tempArr= this.state.messages;
    tempArr.push({
      author: message.author,
      message: message.message,
      fromMe: false,
      timestamp: new Date().getTime()
    });
    this.setState({messages: tempArr, isVisibleToClient: message.isVisibleToClient})

  }
    

  keyPressed=(event) =>  {
    if (event.key === "Enter") {
      if(event.target.value !== ''){
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
    let tempArr= this.state.messages;
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
      this.ws.emit('send message',message)
      this.setState({
        messages:tempArr,
        message:"",
        isVisibleToClient: 0
      });
    }
  }

  
  render() {
    return(
      <div  className="layout">
        <Toolbar
          leftItems= "Job Title"
          rightItems= "Participants"       
          handleClientAnswer = {this.submitMessage}   
          handleAnswerInput = {this.handleAnswerInput}
          userRole = {USER_DETAILS[0].role}
        />
        <Messages messages={this.state.messages} />
        
        <div className="compose">
          <input
            type="text"
            className="compose-input"
            placeholder="  Type a message"
            onChange={ e => { this.setState({message: e.target.value}) }}
            value={this.state.message}
            onKeyPress={e=>this.keyPressed(e)}
          />
          <i 
            style={{color:"#44c372",fontSize: "x-large",marginLeft: 15}} 
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
    ActiveJobDetail: state.ActiveJobDetail
  };
}

export default connect(mapStateToProps)(MessageList);
