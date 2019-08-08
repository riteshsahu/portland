import React, { Component } from 'react';
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";

import './MessageList.css';
import Messages from '../Message/Messages';
import Toolbar from '../Toolbar/Toolbar';

const MY_USER_ID = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails'))[0].userId : 'not defined';
const author = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails'))[0].firstName : 'not defined';
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:"",
      messages: []
    };
  }

  ws = socketIOClient('https://portland-web.herokuapp.com')
  
  componentDidMount() {
    let subscribe = {
      room: window.location.href.split('/').pop(),
      userId: MY_USER_ID
    }
    this.ws.emit('subscribe', subscribe);

    this.ws.on("response", evt => {
      console.log('evt', evt)
      const message = evt
      this.addMessage(message)
    }); 
  }

  componentWillReceiveProps(nextProps) {
    console.log('next props---', nextProps)
  }

  componentDidUpdate(prevProps) {
    let subscribe = {
      room: window.location.href.split('/').pop(),
      userId: MY_USER_ID
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

  addMessage = message => {
    let tempArr= this.state.messages;
    tempArr.push({
      author: message.author,
      message: message.message,
      fromMe: false,
      timestamp: new Date().getTime()
    });
    this.setState({messages: tempArr})

  }
    

  keyPressed=(event) =>  {
    if (event.key === "Enter") {
      this.submitMessage(event.target.value)
    }
  }
  
  submitMessage=(value) => {
    let tempArr= this.state.messages;
    tempArr.push({
      author: author,
      message: this.state.message,
      fromMe: true,
      timestamp: new Date().getTime()
    });
    const message = { userId: MY_USER_ID, message: this.state.message, room: window.location.href.split('/').pop(), author: author }
    this.ws.emit('send message',message)

    this.setState({
      messages:tempArr,
      message:""
    });

  }

  render() {
    return(
      <div className="container">
        <Toolbar
          leftItems= "Job Title"
          rightItems= "Participants"          
        />
        <Messages messages={this.state.messages} />
        
        <div className="compose">
          <input
            type="text"
            className="compose-input"
            placeholder="  Type a message"
            onChange={e=>{this.setState({message: e.target.value})}}
            value={this.state.message}
            onKeyPress={e=>this.keyPressed(e)}
          />
          <i style={{color:"#44c372",fontSize: "x-large",marginLeft: 15}} onClick={() => this.submitMessage(this.state.message)} class="fa fa-paper-plane"></i>
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
