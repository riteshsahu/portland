import React, { Component } from 'react';
import { connect } from "react-redux";
import RoleChat from './RoleChat/Views/RoleChat';
// import PrivateChat from './PrivateChat/Views/PrivateChat';
import { getChatHistory } from '../action.chat';
import Aux from '../../../../Aux/Aux'
import Messenger from './Messenger/Messenger';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
        var JobId = this.props.params.id;

        this.props.getChatHistory(JobId, USER_DETAILS[0].userId);

        // window.clientSocket.on('main chat messages updated', (result) => {
        //     console.log("main chat messages updated" , result);
        //     this.props.getChatHistory(JobId, USER_DETAILS[0].userId);
        // });

        window.clientSocket.on('chat messages updated', (result) => {
            this.props.getChatHistory(JobId, USER_DETAILS[0].userId);
        });

        if (USER_DETAILS) {
            let subscription = {
                userId: USER_DETAILS[0].userId,
                JobId: JobId
            }

            // subscirbe user to this main chat
            console.log('subscribe to chat room', subscription);
            window.clientSocket.emit('subscribe to chat room', subscription);
        }
    }

    componentDidUpdate(prevProps) {
        var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
        if (this.props.JobId != prevProps.JobId) {
            if (USER_DETAILS) {
                let subscription = {
                    userId: USER_DETAILS[0].userId,
                    JobId: this.props.JobId
                }
    
                // subscirbe user to this main chat
            console.log('subscribe to main chat', subscription);
            window.clientSocket.emit('subscribe to main chat', subscription);
            }
        }

        if (this.props.chatHistory.length > 0 && prevProps.chatHistory != this.props.chatHistory) {
            let messages = [];

            this.props.chatHistory.forEach((data, index) => {
                let fromMe = (data.createBy == USER_DETAILS[0].userId) ? true : false;

                if (fromMe) {
                    // messages sent by me
                    messages.push({
                        author: this.props.KeyRole[data.senderRole] + "-" + data.senderFirstName,
                        fromMe: fromMe,
                        message: data.message,
                        fileName: data.fileName,
                        filePath: data.filePath,
                        fileType: data.fileType,
                        timestamp: new Date().getTime(),
                        createBy: data.createBy
                    })
                } else if (!fromMe) {
                    // messages sent by others
                    messages.push({
                        author: this.props.KeyRole[data.senderRole] + "-" + data.senderFirstName,
                        fromMe: fromMe,
                        message: data.message,
                        fileName: data.fileName,
                        filePath: data.filePath,
                        fileType: data.fileType,
                        timestamp: new Date().getTime(),
                        createBy: data.createBy
                    })
                }
            })

            this.setState({
                messages: messages,
            })
        }
    }

    submitMessage = (messageData) => {
        var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';

        const additionalMessageData = {
            // isVisibleToClient: this.state.isVisibleToClient,
            userId: USER_DETAILS[0].userId,
            JobId: this.props.JobId,
            author: USER_DETAILS[0].firstName,
            // recipientRole: this.props.roleKey
        }

        for (let key in additionalMessageData) {
            messageData[key] = additionalMessageData[key];
        }

        window.clientSocket.emit('main chat send message', messageData);
    }
    
    render() {
        return (
            <Aux>
                {this.props.params.roleKey ?
                    <RoleChat params={this.props.params} />
                    // : this.props.params.privateChatId ?
                        // <PrivateChat params={this.props.params} />
                        :
                        <Messenger messages={this.state.messages} onSubmitMessage={this.submitMessage}/>
                }
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        chatHistory: state.ChatDetail.chatHistory,
        JobId: state.ActiveJobDetail.JobId,
        KeyRole: state.ActiveJobDetail.KeyRole
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getChatHistory: (id, userId) => dispatch(getChatHistory(id, userId)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);