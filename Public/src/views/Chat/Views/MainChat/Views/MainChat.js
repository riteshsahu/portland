import React, { Component } from 'react';
import { connect } from "react-redux";
// import PrivateChat from './PrivateChat/Views/PrivateChat';
import { getChatHistory } from '../action.mainChat';
import { Row, Alert } from 'reactstrap';
import Messenger from '../../Messenger/Messenger';
import Aux from '../../../../Aux/Aux'

class MainChat extends Component {
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

        window.clientSocket.on('main chat messages updated', (result) => {
            this.props.getChatHistory(JobId, USER_DETAILS[0].userId);
        });

        if (USER_DETAILS) {
            let subscription = {
                userId: USER_DETAILS[0].userId,
                JobId: JobId
            }

            // subscirbe user to this main chat
            window.clientSocket.emit('subscribe to main chat', subscription);
        }
    }

    componentDidUpdate(prevProps) {
        var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
        if (this.props.params.id != prevProps.params.id) {
            this.setState({
                messages: [],
            })
        } else {
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
                        let currentUserIsClient = USER_DETAILS[0].role == 6;
                        let author = "";
                        if (currentUserIsClient) {
                            author = "Portland Representative";
                        } else {
                            author = this.props.KeyRole[data.senderRole] + "-" + data.senderFirstName;
                        }
                        messages.push({
                            author: author,
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
    }

    componentWillUnmount() {
        var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';

        if (USER_DETAILS) {
            let unsubscribe = {
                userId: USER_DETAILS[0].userId,
                JobId: this.props.params.id
            }

            // unsubscirbe user from from this chat
            window.clientSocket.emit('unsubscribe from main chat', unsubscribe);
        }
    }

    submitMessage = (messageData) => {
        var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';

        const additionalMessageData = {
            // isVisibleToClient: this.state.isVisibleToClient,
            userId: USER_DETAILS[0].userId,
            JobId: this.props.JobId,
            author: USER_DETAILS[0].firstName,
            jobParticipants: this.props.ParticipantsDetails
        }

        for (let key in additionalMessageData) {
            messageData[key] = additionalMessageData[key];
        }

        window.clientSocket.emit('main chat send message', messageData);
    }

    render() {
        return (
            <Aux>
                {this.props.errorFrom === "MAIN_CHAT" ?
                    <Row>
                        <Alert color="danger">{this.props.errorName}</Alert>
                    </Row>
                    : null}
                <Messenger messages={this.state.messages} onSubmitMessage={this.submitMessage} />
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        chatHistory: state.MainChatDetail.chatHistory,
        ParticipantsDetails: state.ActiveJobDetail.ParticipantsDetails,
        JobId: state.ChatDetail.JobId,
        KeyRole: state.ChatDetail.KeyRole
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getChatHistory: (id, userId) => dispatch(getChatHistory(id, userId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MainChat);