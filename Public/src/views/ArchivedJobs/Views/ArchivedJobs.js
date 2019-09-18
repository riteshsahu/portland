import React, { Component } from 'react';
import { connect } from "react-redux";
import Messenger from './Messenger/Messenger';

class ArchivedJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
       

    }
    render() {
        return (
            <div style={{ width: "100%",height: "100%", display: "flex", flexDirection: "column", flexWrap: "nowrap"}}>
                <Messenger params={this.props.match.params}/>               

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
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ArchivedJobs);

