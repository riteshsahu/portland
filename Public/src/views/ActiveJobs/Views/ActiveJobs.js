import React, { Component } from 'react';
import { connect } from "react-redux";
import {Row, Alert} from 'reactstrap';
import { getJobDetails, getJobParticipants, getPrivateChatData } from '../action.activeJobs';
import Toolbar from './Toolbar/Toolbar';
import RoleChat from './RoleChat/Views/RoleChat';
import PrivateChat from './privateChat/Views/PrivateChat'

class ActiveJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
        this.props.getJobDetails(this.props.match.params.id);
        // this.props.getJobParticipants(this.props.match.params.id);
        // this.props.getPrivateChatData(this.props.match.params.id, USER_DETAILS[0].userId)
    }
    
    render() {
        var USER_DETAILS = localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : '';
        return (
            <div style={{ position: "relative", height: "100%" }}>
                <div style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0", height: "100%" }}>
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", flexWrap: "nowrap", position: "relative" }}>
                        {this.props.errorFrom === "ACTIVE_JOB_DETAIL" ?
                            <Row>
                                <Alert color="danger">{this.props.errorName}</Alert>
                            </Row>
                            : null}
                        {/* <Messenger   history={this.props.history} params={this.props.match.params}/>                */}
                        <Toolbar
                            leftItems="Job Title"
                            rightItems="Participants"
                            handleClientAnswer={(value) => this.submitMessage(value)}
                            userRole={USER_DETAILS[0].role}
                            history={this.props.history}
                            params={this.props.match.params}
                        />
                        {this.props.match.params.roleKey ?
                            <RoleChat params={this.props.match.params} />
                            : this.props.match.params.privateChatId ?
                                <PrivateChat params={this.props.match.params} />
                                :
                                <div style={{ fontSize: "1.5rem", display: "flex", justifyContent: "center", alignItems: "center", flexGrow: "1" }}>
                                    <span>Please click on a tab to start chat.</span>
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        errorName: state.ProfileDetail.errorMessage.errorName,
        errorFrom: state.ProfileDetail.errorMessage.errorFrom,
        JobId: state.ActiveJobDetail.JobId,
        JobTitle: state.ActiveJobDetail.JobTitle,
    };
}

// const mapStateToProps = state => {
//     return {
//       privateChatId: state.PrivateChatDetail.privateChatId,
//       chatName: state.PrivateChatDetail.chatName,
//       ParticipantsDetails: state.ActiveJobDetail.ParticipantsDetails,
//       privateChatData: state.ActiveJobDetail.privateChatData,
//       // ParticipantsDetails: state.PrivateChatDetail.ParticipantsDetails,
//       // privateChatData: state.PrivateChatDetail.privateChatData
//     };
//   }

function mapDispatchToProps(dispatch) {
    return {
        getJobDetails: (id) => dispatch(getJobDetails(id)),
        getJobParticipants: (id) => dispatch(getJobParticipants(id)),
        getPrivateChatData: (jobId, userId, roleId) => dispatch(getPrivateChatData(jobId, userId, roleId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobs);

