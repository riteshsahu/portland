import React, { Component } from 'react';
import Compose from '../Compose/Compose';
import Toolbar from '../Toolbar/Toolbar';
import ToolbarButton from '../ToolbarButton/ToolbarButton';
import Message from '../Message/Message';
import moment from 'moment';

import './MessageList.css';

const MY_USER_ID = 'apple';

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:"",
      messages: []
    };
  }

  // componentDidMount() {
  //   this.getMessages();
  // }

  // getMessages = () => {
  //   this.setState(prevState => {
  //     return {
  //       ...prevState,
  //       messages: [
          // {
          //   id: 1,
          //   author: 'apple',
          //   message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          //   timestamp: new Date().getTime()
          // },
          // {
          //   id: 2,
          //   author: 'orange',
          //   message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          //   timestamp: new Date().getTime()
          // },
          // {
          //   id: 3,
          //   author: 'orange',
          //   message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          //   timestamp: new Date().getTime()
          // },
          // {
          //   id: 4,
          //   author: 'apple',
          //   message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          //   timestamp: new Date().getTime()
          // },
          // {
          //   id: 5,
          //   author: 'apple',
          //   message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          //   timestamp: new Date().getTime()
          // },
          // {
          //   id: 6,
          //   author: 'apple',
          //   message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          //   timestamp: new Date().getTime()
          // },
          // {
          //   id: 7,
          //   author: 'orange',
          //   message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          //   timestamp: new Date().getTime()
          // },
          // {
          //   id: 8,
          //   author: 'orange',
          //   message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          //   timestamp: new Date().getTime()
          // },
          // {
          //   id: 9,
          //   author: 'apple',
          //   message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
          //   timestamp: new Date().getTime()
          // },
          // {
          //   id: 10,
          //   author: 'orange',
          //   message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
          //   timestamp: new Date().getTime()
          // },
  //       ]
  //     };
  //   });
  // }

  handleMessages=(e) => {
    this.setState({
      message: e.target.value
    })
  }
  keyPressed=(event) =>  {
    if (event.key === "Enter") {
      this.submitMessage(event.target.value)
    }
  }
  
  submitMessage=(value) => {
  console.log("hello world msg submitted",this.state.message)
  console.log("===message--",this.state.messages);
  let tempArr= this.state.messages;
  let id = this.state.messages.length;
  tempArr.push({
    id: 1,
    author: "apple",
    message: this.state.message,
    timestamp: new Date().getTime()
  });

  // tempArr.push (value);
  this.setState({
    messages:tempArr,
    message:""
  })
  
  }

  renderMessages() {
    let i = 0;
    let messageCount = this.state.messages.length;
    let messages = [];

    while (i < messageCount) {
      let previous = this.state.messages[i - 1];
      let current = this.state.messages[i];
      let next = this.state.messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      messages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return messages;
  }

  render() {
    return(
      <div className="message-list">
        <Toolbar
            leftItems= "Job Title"
        //   title=""
          rightItems= "Participants"

            // <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            // <ToolbarButton key="video" icon="ion-ios-videocam" />,
            // <ToolbarButton key="phone" icon="ion-ios-call" />
          
        />

        <div className="message-list-container">{this.renderMessages()}</div>


        <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="  Type a message"
          onChange={e=>{this.handleMessages(e)}}
          value={this.state.message}
          onKeyPress={e=>this.keyPressed(e)}

        />
                <i style={{color:"#44c372",fontSize: "x-large",marginLeft: 15}} onClick={this.submitMessage} class="fa fa-paper-plane"></i>
      </div>
     </div>
    );
  }
}