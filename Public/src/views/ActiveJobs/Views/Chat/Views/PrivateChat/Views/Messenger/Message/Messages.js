import React, { Component } from 'react';
import './Messages.css';
import Message from './Message';

export default class Messages extends Component {

  componentDidUpdate() {
    // There is a new message in the state, scroll to bottom of list
    const objDiv = document.getElementById('messageList');
    objDiv.scrollTop = objDiv.scrollHeight;
  }
  render() {
    
}