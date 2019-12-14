import React, { Component } from 'react';
import { connect } from "react-redux";
import Messenger from '../../Messenger/Messenger';
import { Row, Alert } from 'reactstrap';
import { getRoleChatHistory } from '../action.roleChat';
import Aux from '../../../../../../Aux/Aux';

class RoleChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        }
    }

    componentDidMount() {
        var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
        var JobId = this.props.params.id;
        var roleKey = this.props.params.roleKey;
        this.props.getRoleChatHistory(JobId, USER_DETAILS[0].userId, roleKey);

        // window.clientSocket.on('role chat messages updated', (result) => {
        //     console.log("role chat messages updated" , result);
            
        //     this.props.getRoleChatHistory(JobId, USER_DETAILS[0].userId, roleKey);
        // });

        window.clientSocket.on('chat messages updated', (result) => {
            this.props.getRoleChatHistory(JobId, USER_DETAILS[0].userId, roleKey);
        });

        // if (USER_DETAILS) {
        //     let subscription = {
        //         roleKey: roleKey,
        //         userId: USER_DETAILS[0].userId,
        //         jobId: JobId
        //     }

        //     // subscirbe user to this role chat
        //     console.log('subscribe to role chat', subscription);
        //     window.clientSocket.emit('subscribe to role chat', subscription);

        //     window.clientSocket.on("response", evt => {
        //         if ((USER_DETAILS[0].role !== 6) || (USER_DETAILS[0].role === 6 && evt.isVisibleToClient)) {
        //             const message = evt;
        //             this.addMessage(message)
        //         }
        //     });
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';

        if (prevProps.params.roleKey != this.props.params.roleKey) {
            this.props.getRoleChatHistory(this.props.JobId, USER_DETAILS[0].userId, this.props.params.roleKey);

            // let subscription = {
            //     roleKey: this.props.params.roleKey,
            //     userId: USER_DETAILS[0].userId,
            //     jobId: this.props.JobId
            // }

            // // subscirbe user to this role chat
            // console.log('subscribe to role chat', subscription);
            
            // window.clientSocket.emit('subscribe to role chat', subscription);

            // this.setState({
            //     messages: []
            // })
        }

        if (this.props.chatHistory.length > 0 && prevProps.chatHistory != this.props.chatHistory) {
            let messages = [];
            // console.log(this.props.chatHistory);

            this.props.chatHistory.forEach((data, index) => {
                let fromMe = (data.createBy == USER_DETAILS[0].userId) ? true : false;

                if (fromMe) {
                    // messages sent by me
                    if (data.recipientRole == this.props.roleKey) {
                        // to current role tab
                        messages.push({
                            author: this.props.KeyRole[data.senderRole] + "-" + data.senderFirstName,
                            fromMe: fromMe,
                            message: data.message,
                            fileName: data.fileName,
                            filePath: data.filePath,
                            fileType: data.fileType,
                            timestamp: new Date().getTime(),
                            createBy: this.props.roleKey
                        })
                    }
                } else if (!fromMe) {
                    // messages sent by others
                    if (data.recipientRole == this.props.roleKey) {
                        // to current role tab
                        messages.push({
                            author: this.props.KeyRole[data.senderRole] + "-" + data.senderFirstName,
                            fromMe: fromMe,
                            message: data.message,
                            fileName: data.fileName,
                            filePath: data.filePath,
                            fileType: data.fileType,
                            timestamp: new Date().getTime(),
                            createBy: this.props.roleKey
                        })
                    }
                }
            })

            this.setState({
                messages: messages,
                // message: ""
            })
        }
    }

    componentWillUnmount() {
        // var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';

        // if (USER_DETAILS) {
        //     let unsubscribe = {
        //         room: window.location.href.split('/').pop(),
        //         userId: USER_DETAILS[0].userId
        //     }

        //     // unsubscirbe user from from this chat
        //     window.clientSocket.emit('unsubscribe', unsubscribe);
        // }
    }

    submitMessage = (messageData) => {
        var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';

        const additionalMessageData = {
            // isVisibleToClient: this.state.isVisibleToClient,
            userId: USER_DETAILS[0].userId,
            JobId: this.props.JobId,
            author: USER_DETAILS[0].firstName,
            recipientRole: this.props.roleKey
        }

        for (let key in additionalMessageData) {
            messageData[key] = additionalMessageData[key];
        }
        console.log("role chat message sent", messageData);
        window.clientSocket.emit('role chat send message', messageData);
    }

    render() {
        return (
            <Aux>
                {this.props.errorFrom === "ROLE_CHAT" ?
                    <Row>
                        <Alert color="danger">{this.props.errorName}</Alert>
                    </Row>
                    : null}
                <Messenger messages={this.state.messages} onSubmitMessage={this.submitMessage}/>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        JobId: state.ActiveJobDetail.JobId,
        KeyRole: state.ActiveJobDetail.KeyRole,
        roleKey: state.RoleChatDetail.roleKey,
        chatHistory: state.RoleChatDetail.chatHistory,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // getRoleChatDetails: (id) => dispatch(getRoleChatDetails(id)),
        getRoleChatHistory: (id, userId, role) => dispatch(getRoleChatHistory(id, userId, role)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RoleChat);

