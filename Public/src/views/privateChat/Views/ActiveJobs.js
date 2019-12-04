import React, { Component } from 'react';
import { connect } from "react-redux";
import Messenger from './Messenger/Messenger';
import {Row,Alert} from 'reactstrap';
import { getPrivateChatDetails } from '../action.activeJobs';

class PrivateChat extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
       

    }

    componentDidMount() {
        this.props.getPrivateChatDetails(this.props.match.params.id);
    }
    

    render() {
        return (
            <div style={{ width: "100%",height: "100%", display: "flex", flexDirection: "column", flexWrap: "nowrap"}}>
                {this.props.errorFrom === "PRIVATE_CHAT" ?
            <Row>
                <Alert color= "danger">{this.props.errorName}</Alert>
            </Row>
              : null } 
                <Messenger   history={this.props.history} params={this.props.match.params}/>               

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPrivateChatDetails: (id) => dispatch(getPrivateChatDetails(id)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(PrivateChat);

