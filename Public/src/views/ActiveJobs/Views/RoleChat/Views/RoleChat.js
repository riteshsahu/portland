import React, { Component } from 'react';
import { connect } from "react-redux";
import Messenger from './Messenger/Messenger';
import {Row,Alert} from 'reactstrap';
import { getRoleChatDetails } from '../action.roleChat';
import Aux from '../../../../Aux/Aux'

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
            <Aux>
                {this.props.errorFrom === "ROLE_CHAT" ?
            <Row>
                <Alert color= "danger">{this.props.errorName}</Alert>
            </Row>
              : null } 
                <Messenger params={this.props.params}/>               

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
        // getRoleChatDetails: (id) => dispatch(getRoleChatDetails(id)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RoleChat);

