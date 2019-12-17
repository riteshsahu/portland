import React, { Component } from 'react';
import MessageList from './MessageList/MessageList';
import './Messenger.css';
import Compose from './Compose/Compose';
import { connect } from "react-redux";
import Aux from '../../../Aux/Aux';
import { Alert } from 'reactstrap';

class Messenger extends Component {
  render() {
    return (
      <Aux>
        <MessageList messages={this.props.messages} />
        {
          this.props.jobType === "active" ?
            <Compose onSubmitMessage={this.props.onSubmitMessage} />
            :
            <Alert className="deleteAlert" color="danger">This Chat Has Been Deleted By Admin</Alert>
        }
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobType: state.ChatDetail.jobType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
