import React, { Component } from 'react';
import MessageList from '../Messenger/MessageList/MessageList';
import './Messenger.css';

export default class Messenger extends Component {
  render() {
    return (
      <div className="messenger">

        <div className="scrollable content">
          <MessageList />
        </div>
      </div>
    );
  }
}