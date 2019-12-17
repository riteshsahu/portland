import React, { Component } from 'react';
// import { connect } from "react-redux";
import Message from './Message/Message';
import './MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    // Loop through all the messages in the state and create a Message component
    const messages = this.props.messages.map((message, i) => {
      return (
        <Message
          key={i}
          username={message.author}
          message={message.message}
          fileName={message.fileName}
          filePath={message.filePath}
          fileType={message.fileType}
          fromMe={message.fromMe} />
      );
    });

    return (
      <div className='messages' id='messageList'>
        {messages}
      </div>
    );
  }
}

export default MessageList;
