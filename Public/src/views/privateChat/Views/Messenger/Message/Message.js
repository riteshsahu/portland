import React from 'react';
import './Message.css';
import { Label } from 'reactstrap';

class Message extends React.Component {
  render() {
    // Was the message sent by the current user. If so, add a css class
    const fromMe = this.props.fromMe ? 'from-me' : '';

    return (
      <div className={`message ${fromMe}`}>
        <div className='username'>
          {this.props.username}
        </div>
        <div className='message-body'>
          <Label>
            {this.props.message}
          </Label>


        </div>
      </div>
    );
  }
}

Message.defaultProps = {
  message: '',
  username: '',
  fromMe: false
};

export default Message;
