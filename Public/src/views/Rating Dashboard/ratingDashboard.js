import React, { Component } from 'react';
import { Card, CardHeader, } from 'reactstrap';
import Header from './header/header';
import Tabs from './tabs/tabs';

class DashBoardNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <>
           <Header/>
           <Tabs/>
           </>
        )
    }
}
export default DashBoardNew; 