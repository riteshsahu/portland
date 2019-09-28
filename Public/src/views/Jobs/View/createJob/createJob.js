
import React, { Component } from 'react';
import { Button, Col, Alert, Label, Input, Row } from 'reactstrap';
import { connect } from "react-redux";
import { CreateNewJob, updateJobDetails } from '../../jobs.action';
import TagsInput from 'react-tagsinput'
import '../../jobs.css';
import Autosuggest from 'react-autosuggest';
import { GetUserList, getUserSuggestions } from '../../../userDetail/userDetail.action';
class CreateJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUpdateMode: false,
            tags: [],
            createNew: false,
            jobDetails: {
                jobId: Date.now(),
                jobTitle: '',
                jobCreatedBy: '',
                jobStatus: '',
                jobUsers: [],
                jobDescription: ''
            },
            isSubmitted: false
        }

    }

    componentDidMount() {
        
        // this.props.GetUserList(0);
        this.props.getUserSuggestions();
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        let jobDetail = this.state.jobDetails; 
        if(!this.props.updateJob) {
            if (userDetails[0].role != 1){
                jobDetail["jobUsers"].push(userDetails[0].userId);
            }
            jobDetail["jobUsers"].push("1");
            let tag =[];
            if (userDetails[0].role != 1){
                tag.push(userDetails[0].firstName +" "+ userDetails[0].lastName);
            }
           
            tag.push("Admin" +" "+ "Admin");
            this.setState({
                jobDetails: jobDetail,
                tags: tag
            })
        }
        
    }

    getUsersId = (tags) => {
        let arr = this.props.userList.filter(user => {
            var resdIndex = tags.findIndex(dt => {
                return dt === user.name
            });
            if (resdIndex >= 0) {
                return true;
            } else {
                return false;
            }
        });
        let tagsUser = [];
        arr.map(dt => {
            tagsUser.push(dt.id);
        });
        let temp = this.state.jobDetails;
        temp["jobUsers"] = tagsUser;
        this.setState({
            jobDetails: temp
        })


    }

    handleChange = (tags) => {
        this.setState({ tags });
        this.getUsersId(tags);
    }

    handleJobChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        let temp = this.state.jobDetails;
        temp[id] = value;
        this.setState({
            jobDetails: temp
        })
    }
    handleSumbit = () => {
        let temp =  this.state.jobDetails.jobUsers;
        let isExist = temp.findIndex(el=> el === 1)
        if (isExist== -1){
            temp.push("1")
        }
        let count = 0, index;
        temp.map((data, i) => {
           if(data === "1") {
               count= count+1;
               index = i 
           }
        })
        let finalArr = temp;
        if (count> 1) {
           temp = finalArr.filter((res,i) => i !== index)
        }
        
        const userDetails = localStorage.getItem("userDetails");
        const user = JSON.parse(userDetails);
        let data = {
            "jobId": this.state.jobDetails.jobId,
            "jobTitle": this.state.jobDetails.jobTitle,
            "jobDescription": this.state.jobDetails.jobDescription,
            "jobCreatedBy": user[0].userId,
            "jobStatus": this.state.jobDetails.jobStatus,
            "isActive": 1, 
            "jobUsers": temp,
            "createAt": new Date(),
            "createBy": user[0].userId,
        }
          this.props.CreateNewJob(data);
    }

    updateJob = () => {
        let temp =  this.state.jobDetails.jobUsers;
        let isExist = temp.findIndex(el=> el === 1)
        if (isExist== -1){
            temp.push(1)
        }
        const userDetails = localStorage.getItem("userDetails");
        const user = JSON.parse(userDetails);
        let data = {
            "jobTitle": this.state.jobDetails.jobTitle,
            "jobDescription": this.state.jobDetails.jobDescription,
            "jobStatus": this.state.jobDetails.jobStatus,
            "jobCreatedBy": this.state.jobDetails.jobCreatedBy,
            "createBy": user[0].userId,
            "createAt": new Date(),
            "updatedAt": new Date(),
            "updatedBy": user[0].userId,
            "jobUsers": temp
        };
        this.props.updateJobDetails(this.props.updatedDetails.jobId, data);
        this.setState({
            tags: []
              })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updatedDetails.jobId && !this.state.isUpdateMode) {
            let tagsArr = [];
            if(nextProps.updatedDetails.userId && nextProps.updatedDetails.userId.length > 0){
                nextProps.updatedDetails.userId.map(dt => {
                nextProps.userList.findIndex(stData => {
                    if (stData.id == dt) {
                        tagsArr.push(stData.name);
                    }
                })
            });
        }
            this.setState(prevState => ({
                ...prevState,
                jobDetails: {
                    ...prevState.jobDetails,
                    jobTitle: nextProps.updatedDetails.jobTitle,
                    jobDescription: nextProps.updatedDetails.jobDescription,
                    jobCreatedBy: nextProps.updatedDetails.jobCreatedBy,
                    jobStatus: nextProps.updatedDetails.jobStatus,
                    jobUsers: tagsArr
                },
                isUpdateMode: true,
                tags: tagsArr
            }))
        }
    }


    render() {
        const self= this.props
        function autocompleteRenderInput({ addTag, ...props }) {
            const handleOnChange = (e, { newValue, method }) => {
                if (method === 'enter') {
                    e.preventDefault()
                } else {
                    props.onChange(e)
                }
            }

            const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
            const inputLength = inputValue.length

            let suggestions =[];
             if(self.userList.length > 0) { 
                suggestions=  self.userList.filter((state) => {
                 return state.name.toLowerCase().slice(0, inputLength) === inputValue
                //suggestions.push(state.name.toLowerCase().slice(0, inputLength) === inputValue)  
            })
            }

            return (
                <Autosuggest
                    ref={props.ref}
                    suggestions={suggestions}
                    shouldRenderSuggestions={(value) => value && value.trim().length > 0}
                    getSuggestionValue={(suggestion) => suggestion.name}
                    renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
                    inputProps={{ ...props, onChange: handleOnChange }}
                    onSuggestionSelected={(e, { suggestion }) => {
                        addTag(suggestion.name)
                    }}
                    onSuggestionsClearRequested={() => { }}
                    onSuggestionsFetchRequested={() => { }}
                />
            )
        }


        return (
            <div>

                {this.props.updatedDetails.jobId &&
                    <Row style={{ marginTop: 5 }}>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                        <Col xs="5" md="2" lg="2">
                            <Label> Job ID:-  </Label>
                        </Col>
                        <Col xs="5" md="4" lg="4">
                            <Input type="text" disabled value={this.props.updatedDetails.jobId} />
                        </Col>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                    </Row>
                }
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Job Title:-  </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input type="text" id="jobTitle" value={this.state.jobDetails.jobTitle} 
                        onChange={this.handleJobChange} placeholder="Job" />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Job Description:-  </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input type="text" id="jobDescription" value={this.state.jobDetails.jobDescription} 
                        onChange={this.handleJobChange} placeholder="Job Description" />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
            
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Status:- </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input id="jobStatus" type="select" onChange={this.handleJobChange}>
                            <option selected disabled >Select Status</option>
                            <option value="1" selected={this.state.jobDetails.jobStatus === 1 ? true : false} >Pending</option>
                            <option value="2" selected={this.state.jobDetails.jobStatus === 2 ? true : false} >Completed</option>
                        </Input>
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Participants:-  </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <TagsInput renderInput={autocompleteRenderInput} inputProps={{ placeholder: "Add a Participant" }} value={this.state.tags} onChange={this.handleChange} />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>

                {this.props.updatedDetails.jobId 
                    ? 
                    <Row style={{ marginTop: 5 }}>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                        <Col xs="12" md="6" lg="6">
                            <Button disabled={this.state.isSubmitted}  style={{ float: "right",background: "#ff8f00", color: "white" }} onClick={this.updateJob}>Update</Button>
                        </Col>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                    </Row>
                    :
                    <Row style={{ marginTop: 5 }}>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                        <Col xs="12" md="6" lg="6">
                            <Button disabled={this.state.isSubmitted}  style={{ float: "right",background: "#ff8f00", color: "white" }} onClick={this.handleSumbit}>Create</Button>
                        </Col>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                    </Row>
                }
                {this.props.jobUpdated &&
                    <Row style={{ marginTop: 5 }}>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                        <Col xs="12" md="6" lg="6">
                            <Alert color="success" style={{ width: "90%" }}>
                                Job Updated SuccessFully. Thanks !
                            </Alert>
                        </Col>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                    </Row>}


                {this.props.jobCreateCompleted &&
                    <Row style={{ marginTop: 5 }}>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                        <Col xs="12" md="6" lg="6">
                            <Alert color="success" style={{ width: "90%" }}>
                                Job Created SuccessFully. Thanks !
                            </Alert>
                        </Col>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                    </Row>
                }
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        updatedDetails: state.jobDetail.updatedDetails,
        jobUpdated: state.jobDetail.jobUpdated,
        createJob: state.jobDetail.createJob,
        jobCreateCompleted: state.jobDetail.jobCreateCompleted,
        userList: state.jobDetail.userList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CreateNewJob: (data) => dispatch(CreateNewJob(data)),
        updateJobDetails: (id, data) => dispatch(updateJobDetails(id, data)),
        // GetUserList: (offset) => dispatch(GetUserList(offset)),
        getUserSuggestions: () => dispatch(getUserSuggestions())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateJob);
