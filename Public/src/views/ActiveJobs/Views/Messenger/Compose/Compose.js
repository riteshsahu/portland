import React, { Component } from 'react';
import './Compose.css';

export default class Compose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: [],
    }
}
handleMessages=(e) => {
  this.submitMessage(event.target.value)
}
keyPressed=(event) =>  {
  if (event.key === "Enter") {
    this.submitMessage(event.target.value)
  }
}

submitMessage=(value) => {
console.log("hello world msg submitted")
this.setState({
  message: value
})
}
  render() {
    console.log("this.state.message",this.state.message)
   
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="  Type a message"
          onChange={e=>{this.handleMessages(e)}}
          onKeyPress={this.keyPressed}

        />
                <i style={{color:"#44c372",fontSize: "x-large",marginLeft: 15}} onClick={this.submitMessage} class="fa fa-paper-plane"></i>

{/* 
        {
          this.props.rightItems
        } */}
      </div>
    );
  }
}