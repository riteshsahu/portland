import React, { Component } from 'react';
import MessageList from '../Messenger/MessageList/MessageList';
import './Messenger.css';

export default class Messenger extends Component {
  render() {
    return (
      // <div style={{width: "100%"}}> 
        <MessageList  history={this.props.history} params={this.props.params} />
      // </div>
         
    );
  }
}