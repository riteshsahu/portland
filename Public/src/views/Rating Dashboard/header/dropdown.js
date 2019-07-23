import React, { Component } from 'react';
import { Card, CardHeader, Input} from 'reactstrap';

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
           <div>
               <Input type="select">
               <option>1</option>
               <option>2</option>
               <option>3</option>
               <option>4</option>
               <option>5</option>
               </Input>
           </div>
        )
    }
}
export default DropDown; 