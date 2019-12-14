import React, { Component } from 'react';
import MessageList from './MessageList/MessageList';
import './Messenger.css';
import Compose from './Compose/Compose';
import Aux from '../../../../../Aux/Aux';

export default class Messenger extends Component {
  render() {
    return (
      <Aux>
        <MessageList messages={this.props.messages} />
        <Compose onSubmitMessage={this.props.onSubmitMessage}/>
      </Aux>
    );
  }
}