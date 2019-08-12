import React, { Component } from 'react';
import { connect } from "react-redux";
import Messenger from './Messenger/Messenger';

class ActiveJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            // <div style={{padding: "0px 0px"}}>
                <Messenger />
            // </div>
                
        
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
export default connect(mapStateToProps, mapDispatchToProps)(ActiveJobs);

