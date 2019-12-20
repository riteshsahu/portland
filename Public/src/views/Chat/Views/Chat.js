import React, { Component } from 'react';
import { connect } from "react-redux";
import RoleChat from './RoleChat/Views/RoleChat';
// import PrivateChat from './PrivateChat/Views/PrivateChat';
import { updateChatDetails } from '../action.chat';
import Aux from '../../Aux/Aux'
import MainChat from './MainChat/Views/MainChat';

class Chat extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.updateChatDetails(this.props.params.id, this.props.jobType);
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.id != prevProps.params.id) {
            this.props.updateChatDetails(this.props.params.id, this.props.jobType);
        }
    }
    
    render() {
        return (
            <Aux>
                {this.props.params.roleId ?
                    <RoleChat params={this.props.params} />
                    // : this.props.params.privateChatId ?
                        // <PrivateChat params={this.props.params} />
                        :
                        <MainChat params={this.props.params} />
                        // <Messenger messages={this.state.messages} onSubmitMessage={this.submitMessage}/>
                }
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateChatDetails: (JobId, jobType) => dispatch(updateChatDetails(JobId, jobType)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);