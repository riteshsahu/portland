import React from 'react';
import './Message.css';
import { Label } from 'reactstrap';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };

  }
  triggerInputFileContract = () => this.fileInputContract.click();
  
  render() {
    // Was the message sent by the current user. If so, add a css class
    const fromMe = this.props.fromMe ? 'from-me' : '';

    return (
      <div className={`message ${fromMe}`}>
        <div className='username'>
          {this.props.username}
        </div>
        <div className='message-body'>
          <div>
            {this.props.message}
          </div>
          {this.props.filePath ?
            <div>
              {
                this.props.fileType === "image" ?
                  <a href={this.props.filePath}>
                    <img src={this.props.filePath} alt={this.props.fileName} style={{ height: "150px" }} />
                    </a>
                  :
                  <a href={this.props.filePath}>{this.props.fileName}</a>
              }
            </div>
            :
            null
          }
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
