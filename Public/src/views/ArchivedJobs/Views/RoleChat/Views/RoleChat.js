import React, { Component } from 'react';
import { connect } from "react-redux";
import Messenger from './Messenger/Messenger';
import {Row,Alert} from 'reactstrap';
import { getRoleChatDetails } from '../action.roleChat';

class RoleChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        // this.props.getRoleChatDetails(this.props.match.params.id);
    }
    

    render() {
        return (
            <div style={{ width: "100%",height: "100%", display: "flex", flexDirection: "column", flexWrap: "nowrap"}}>
                {this.props.errorFrom === "ROLE_CHAT" ?
            <Row>
                <Alert color= "danger">{this.props.errorName}</Alert>
            </Row>
              : null } 
                <Messenger params={this.props.params}/>               

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
        // getRoleChatDetails: (id) => dispatch(getRoleChatDetails(id)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RoleChat);

