import React, { Component } from 'react';
import { Button, Col, Alert, Label, Input, Row } from 'reactstrap';
import { connect } from "react-redux";
import { CreateNewJob, updateJobDetails } from '../../jobs.action';
import TagsInput from 'react-tagsinput'
import '../../jobs.css';
import Autosuggest from 'react-autosuggest';
import { GetUserList } from '../../../userDetail/userDetail.action';
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
        console.log('state----', this.state)
        this.props.GetUserList();
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
        console.log("inside submit",)
        const userDetails = localStorage.getItem("userDetails");
        const user = JSON.parse(userDetails);
        let data = {
            "jobId": this.state.jobDetails.jobId,
            "jobTitle": this.state.jobDetails.jobTitle,
            "jobDescription": this.state.jobDetails.jobDescription,
            "jobCreatedBy": user[0].userId,
            "jobStatus": this.state.jobDetails.jobStatus,
            "isActive": 1, // FIX
            "jobUsers": this.state.jobDetails.jobUsers,
            "createAt": new Date(),
            "createBy": user[0].userId,
        }
          this.props.CreateNewJob(data);
    }

    updateJob = () => {
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
            "jobUsers": this.state.jobDetails.jobUsers
        };
        this.props.updateJobDetails(this.props.updatedDetails.jobId, data);
        this.setState({
            tags: []
              })
    }

    componentWillReceiveProps(nextProps) {
        console.log('next props-----', nextProps);
        if (nextProps.updatedDetails.jobId && !this.state.isUpdateMode) {
            let tagsArr = [];
            nextProps.updatedDetails.userId.map(dt => {
                nextProps.userList.findIndex(stData => {
                    if (stData.id === dt) {
                        tagsArr.push(stData.name);
                    }
                })
            });
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

            // let temp = this.state.jobDetails;
            // temp["jobTitle"] = this.props.updatedDetails.jobTitle;
            // temp["jobDescription"] = this.props.updatedDetails.jobDescription;
            // temp["jobCreatedBy"] = this.props.updatedDetails.jobCreatedBy;
            // temp["jobStatus"] = this.props.updatedDetails.jobStatus;
            // temp["jobUsers"] = tagsArr;
            // this.setState({
            //     tags: tagsArr,
            //     jobDetails: temp,
            //     isUpdateMode: true
            // })
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
            // console.log(self, "USERLIST")
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
                        <Input type="text" id="jobTitle" value={this.state.jobDetails.jobTitle} onChange={this.handleJobChange} placeholder="Job" />
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
                        <Input type="text" id="jobDescription" value={this.state.jobDetails.jobDescription} onChange={this.handleJobChange} placeholder="Job Description" />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                {/* <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Created By:- </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input id="jobCreatedBy" type="select" onChange={this.handleJobChange}>
                            <option selected disabled >--- Select Role-----</option>
                            <option value="1" selected={this.state.jobDetails.jobCreatedBy === 1 ? true : false} >Admin</option>
                            <option value="2" selected={this.state.jobDetails.jobCreatedBy === 2 ? true : false} >Management</option>
                            <option value="3" selected={this.state.jobDetails.jobCreatedBy === 3 ? true : false} >Internal Employee</option>
                            <option value="4" selected={this.state.jobDetails.jobCreatedBy === 4 ? true : false} >External Employee</option>
                            <option value="5" selected={this.state.jobDetails.jobCreatedBy === 5 ? true : false} >Designer</option>
                            <option value="6" selected={this.state.jobDetails.jobCreatedBy === 6 ? true : false} >Client</option>
                        </Input>
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row> */}
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Status:- </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input id="jobStatus" type="select" onChange={this.handleJobChange}>
                            <option selected disabled >--- Select Status-----</option>
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
                            <Button disabled={this.state.isSubmitted}  style={{ float: "right",background: "#ff8f00", color: "white" }} onClick={this.handleSumbit}>Create</Button>
                        </Col>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                    </Row>
                    :
                    <Row style={{ marginTop: 5 }}>
                        <Col xs="12" md="3" lg="3">
                        </Col>
                        <Col xs="12" md="6" lg="6">
                            <Button disabled={this.state.isSubmitted} color="success" style={{ float: "right" }} onClick={this.handleSumbit}>Create</Button>
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
        GetUserList: () => dispatch(GetUserList())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateJob);
