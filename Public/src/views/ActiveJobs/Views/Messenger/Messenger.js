import React, { Component } from 'react';
import MessageList from '../Messenger/MessageList/MessageList';
import './Messenger.css';

export default class Messenger extends Component {
  render() {
    return (
      <div className="layout"> 
        <MessageList params={this.props.params} />
      </div>
         
    );
  }
}