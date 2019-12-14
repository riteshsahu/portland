import React, { Component } from 'react';
import { connect } from "react-redux";
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import TextArea from 'react-autosize-textarea';
import './Compose.css';

class Compose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      showEmojiPicker: false,
      selectedFile: "",
    }
  }

  triggerInputFileContract = () => this.fileInputContract.click();

  isValidMessage = (value = "") => {
    return this.state.message.trim() || value.trim()
  }


  addMessage = message => {
    let tempArr = this.state.messages;
    tempArr.push({
      author: message.author,
      message: message.message,
      fromMe: false,
      timestamp: new Date().getTime()
    });
    this.setState({ messages: tempArr, isVisibleToClient: message.isVisibleToClient })

  }

  toggleEmojiPicker = () => {
    this.setState({
      showEmojiPicker: !this.state.showEmojiPicker,
    });
  }

  addEmoji = (e) => {
    let emoji = e.native;
    this.setState({
      message: this.state.message + emoji,
      showEmojiPicker: false,
    });
  }

  keyPressed = (event) => {
    if (event.key === "Enter") {
      if (event.target.value !== '') {
        this.submitMessage(event.target.value)
      }
    }
  }

  onInputChange = (event) => {
    if (event.target.value !== "\n") {
      this.setState({ message: event.target.value });
    }
  }

  handleAnswerInput = (value) => {
    this.setState({
      isVisibleToClient: 1,
      message: value
    })
  }

  handleContractFile = (e) => {
    var file = this.fileInputContract.files[0];
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);

      reader.onloadend = function (e) {
        this.setState({
          selectedFile: {
            name: file.name,
            data: reader.result,
            type: file.type.includes("image") ? "image" : "file"
          }
        })
      }.bind(this);
    }
  }

  submitMessage = () => {
    let message = this.state.message;
    let file = this.state.selectedFile;

    if (this.isValidMessage(message) || file.name) {
      const messageData = {
        message: message,
        file: file || "",
      }

      this.props.onSubmitMessage(messageData);

      this.setState({
        message: "",
        selectedFile: "",
      });
    }
  }

  render() {
    return (
      <div className="compose">

        <TextArea
          rows={1}
          maxRows={10}
          className="compose-input"
          placeholder="Type a message"
          onChange={e => this.onInputChange(e)}
          value={this.state.message}
        // onKeyPress={e => this.keyPressed(e)}
        />
        <div style={{ padding: "5px 10px" }}>
          <input style={{ display: "none" }}
            ref={fileInputContract => this.fileInputContract = fileInputContract}
            type="file" id="fileInputContract" onChange={this.handleContractFile} />

          <i style={{ color: "yellow", fontSize: "x-large", flexDirection: "row-reverse", margin: "0 8px" }}
            className="fa fa-smile-o" onClick={this.toggleEmojiPicker}></i>
          <i style={{ color: "grey", fontSize: "x-large", flexDirection: "row-reverse", margin: "0 8px" }}
            onClick={this.triggerInputFileContract} className="fa fa-paperclip"></i>
          <i style={{ color: "#44c372", fontSize: "x-large", flexDirection: "row-reverse", margin: "0 8px" }}
            onClick={() => { this.submitMessage() }} className="fa fa-paper-plane"></i>
        </div>

        {this.state.showEmojiPicker ? (
          <div className="toggle-emoji"><Picker set="emojione" onSelect={this.addEmoji} /> </div>
        ) : null}

        {
          this.state.selectedFile ?
            this.state.selectedFile.type === "image" ?
              <img src={this.state.selectedFile.data} className="selected-img" />
              :
              <span className="selected-file">{this.state.selectedFile.name}</span>
            :
            null
        }
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Compose);