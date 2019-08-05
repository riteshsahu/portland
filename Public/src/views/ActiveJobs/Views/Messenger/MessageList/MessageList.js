import React, { Component } from 'react';
import { connect } from "react-redux";
import Toolbar from '../Toolbar/Toolbar';
import Message from '../Message/Message';
import moment from 'moment';
import socketIOClient from "socket.io-client";

import './MessageList.css';

const MY_USER_ID = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails'))[0].email : 'not defined';
class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:"",
      messages: []
    };
  }

  ws = socketIOClient('http://localhost:5000/')
  
  componentDidMount() {

    this.ws.emit('subscribe', window.location.href.split('/').pop());

    this.ws.on("response", evt => {
      console.log('evt', evt)
      const message = evt
      this.addMessage(message)
    }); 
  }

  componentDidUpdate(prevProps) {
    console.log('prev props-----', prevProps)
    if(this.props.ActiveJobDetail) {
      if(this.props.ActiveJobDetail.JobId !== prevProps.ActiveJobDetail.JobId) {
        this.ws.emit('subscribe', window.location.href.split('/').pop());
        this.setState({
          messages: []
        })
      }
    }
  }

  addMessage = message =>
    this.setState(state => ({ messages: [message, ...state.messages] }))

  keyPressed=(event) =>  {
    if (event.key === "Enter") {
      this.submitMessage(event.target.value)
    }
  }
  
  submitMessage=(value) => {
    console.log("hello world msg submitted",this.state.message)
    console.log("===message--",this.state.messages);
    let tempArr= this.state.messages;
    // let id = this.state.messages.length;
    tempArr.push({
      id: 1,
      author: MY_USER_ID,
      message: this.state.message,
      timestamp: new Date().getTime()
    });
    const message = { name: MY_USER_ID, message: this.state.message, room: window.location.href.split('/').pop()}
    this.ws.emit('send message',message)

    // tempArr.push (value);
    this.setState({
      messages:tempArr,
      message:""
    })
  }

  renderMessages() {
    let i = 0;
    let messageCount = this.state.messages.length;
    let messages = [];

    while (i < messageCount) {
      let previous = this.state.messages[i - 1];
      let current = this.state.messages[i];
      let next = this.state.messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      messages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return messages;
  }

  render() {
    return(
      <div className="message-list">
        <Toolbar
            leftItems= "Job Title"
        //   title=""
          rightItems= "Participants"

            // <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            // <ToolbarButton key="video" icon="ion-ios-videocam" />,
            // <ToolbarButton key="phone" icon="ion-ios-call" />
          
        />

        <div className="message-list-container">{this.renderMessages()}</div>


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
