import React, { Component } from 'react';
import { Button, Col, Alert, Label, Input, Row } from 'reactstrap';
import { connect } from "react-redux";
import { CreateNewJob } from '../reducer/jobs.action';
import {COUNTRIES} from './Country';
import TagsInput from 'react-tagsinput'
 import '../jobs.css';
 import Autosuggest from 'react-autosuggest'

function states () {
    return [
      {name: 'Alabama'},
      {abbr: 'AK', name: 'Alaska'},
      {abbr: 'AZ', name: 'Arizona'},
      {abbr: 'AR', name: 'Arkansas'},
      {abbr: 'CA', name: 'California'},
      {abbr: 'CO', name: 'Colorado'},
      {abbr: 'CT', name: 'Connecticut'},
      {abbr: 'DE', name: 'Delaware'},
      {abbr: 'FL', name: 'Florida'},
      {abbr: 'GA', name: 'Georgia'},
      {abbr: 'HI', name: 'Hawaii'},
      {abbr: 'ID', name: 'Idaho'},
      {abbr: 'IL', name: 'Illinois'},
      {abbr: 'IN', name: 'Indiana'},
      {abbr: 'IA', name: 'Iowa'},
      {abbr: 'KS', name: 'Kansas'},
      {abbr: 'KY', name: 'Kentucky'},
      {abbr: 'LA', name: 'Louisiana'},
      {abbr: 'ME', name: 'Maine'},
      {abbr: 'MD', name: 'Maryland'},
      {abbr: 'MA', name: 'Massachusetts'},
      {abbr: 'MI', name: 'Michigan'},
      {abbr: 'MN', name: 'Minnesota'},
      {abbr: 'MS', name: 'Mississippi'},
      {abbr: 'MO', name: 'Missouri'},
      {abbr: 'MT', name: 'Montana'},
      {abbr: 'NE', name: 'Nebraska'},
      {abbr: 'NV', name: 'Nevada'},
      {abbr: 'NH', name: 'New Hampshire'},
      {abbr: 'NJ', name: 'New Jersey'},
      {abbr: 'NM', name: 'New Mexico'},
      {abbr: 'NY', name: 'New York'},
      {abbr: 'NC', name: 'North Carolina'},
      {abbr: 'ND', name: 'North Dakota'},
      {abbr: 'OH', name: 'Ohio'},
      {abbr: 'OK', name: 'Oklahoma'},
      {abbr: 'OR', name: 'Oregon'},
      {abbr: 'PA', name: 'Pennsylvania'},
      {abbr: 'RI', name: 'Rhode Island'},
      {abbr: 'SC', name: 'South Carolina'},
      {abbr: 'SD', name: 'South Dakota'},
      {abbr: 'TN', name: 'Tennessee'},
      {abbr: 'TX', name: 'Texas'},
      {abbr: 'UT', name: 'Utah'},
      {abbr: 'VT', name: 'Vermont'},
      {abbr: 'VA', name: 'Virginia'},
      {abbr: 'WA', name: 'Washington'},
      {abbr: 'WV', name: 'West Virginia'},
      {abbr: 'WI', name: 'Wisconsin'},
      {abbr: 'WY', name: 'Wyoming'}
    ]
  }
  
class CreateJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            isUpdated: false,
            jobDetails: {
                job: '',
                jobCreatedBy: '',
                status: '',
                create_date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
                create_time: new Date().getHours() + ":" + new Date().getMinutes(),

            },
            isSubmitted: false
        }
      
    }

    handleChange=(tags) =>  {
        this.setState({tags})
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
        this.setState({
            isSubmitted: !this.state.isSubmitted
        });
        this.props.CreateNewJob(this.state.jobDetails);
    }
    render() {

        console.log("---satte----",this.state);

        function autocompleteRenderInput ({addTag, ...props}) {
            const handleOnChange = (e, {newValue, method}) => {
              if (method === 'enter') {
                e.preventDefault()
              } else {
                props.onChange(e)
              }
            }
      
            const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
            const inputLength = inputValue.length
      
            let suggestions = states().filter((state) => {
              return state.name.toLowerCase().slice(0, inputLength) === inputValue
            })
      
            return (
              <Autosuggest
                ref={props.ref}
                suggestions={suggestions}
                shouldRenderSuggestions={(value) => value && value.trim().length > 0}
                getSuggestionValue={(suggestion) => suggestion.name}
                renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
                inputProps={{...props, onChange: handleOnChange}}
                onSuggestionSelected={(e, {suggestion}) => {
                  addTag(suggestion.name)
                }}
                onSuggestionsClearRequested={() => {}}
                onSuggestionsFetchRequested={() => {}}
              />
            )
          }
      

        return (
            <div>

                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Job:-  </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input type="text" id="job" value={this.state.jobDetails.job} onChange={this.handleJobChange} placeholder="Job" />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Created By:- </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input id="jobCreatedBy" type="select" onChange={this.handleJobChange}>
                        <option selected disabled >--- Select Role-----</option>
                            <option value="1">Admin</option>
                            <option value="2">Management</option>
                            <option value="3">Internal Employee</option>
                            <option value="4">External Employee</option>
                            <option value="5">Designer</option>
                            <option value="6">Client</option>
                        </Input>
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
                        <Input id="status" type="select" onChange={this.handleJobChange}>
                        <option selected disabled >--- Select Status-----</option>
                            <option value="1">Pending</option>
                            <option value="2">Completed</option>
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
                    <TagsInput renderInput={autocompleteRenderInput} inputProps= {{placeholder:"Add a Participant"}}  value={this.state.tags} onChange={this.handleChange} />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                 

                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="12" md="6" lg="6">
                        <Button disabled={this.state.isSubmitted} color="success" style={{ float: "right" }} onClick={this.handleSumbit}>Create</Button>
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                {this.state.isSubmitted &&
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
                    </Row>}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        updatedDetails: state.jobDetail.updatedDetails
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CreateNewJob: (data) => dispatch(CreateNewJob(data)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateJob);
