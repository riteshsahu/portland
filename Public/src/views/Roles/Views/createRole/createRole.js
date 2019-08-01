import React, { Component } from 'react';
import { Button, Col, Alert, Label, Input, Row } from 'reactstrap';
import { connect } from "react-redux";
import { AssignNewRole } from '../../role.action';
import Autosuggest from 'react-autosuggest';
import '../../role.css';

const languages = [
    {
        name: 'Mike',
        email: "mike@gmail.com",
    },
    {
        name: 'Devid',
        email: "Devid@gmail.com"
    },
    {
        name: 'Michel',
        email: "Michel@gmail.com"
    },
    {
        name: 'Jane',
        email: "Jane@gmail.com"
    },
    {
        name: 'Elm',
        email: "Elm@gmail.com"
    },
    {
        name: 'Annie',
        email: "Annie@gmail.com"
    },
    {
        name: 'Auskie',
        email: "Auskie@gmail.com"
    },
    {
        name: 'Jarvis',
        email: "Jarvis@gmail.com"
    },
    {
        name: 'Robert',
        email: "Robert@gmail.com"
    },
    {
        name: 'Kim',
        email: "Kim@gmail.com"
    },
    {
        name: 'Phillip',
        email: "Phillip@gmail.com"
    },
    {
        name: 'Keri',
        email: "Keri@gmail.com"
    },
    {
        name: 'Ruby',
        email: "Ruby@gmail.com"
    },
    {
        name: 'Scala',
        email: "Scala@gmail.com"
    },
    {
        name: 'Christ',
        email: "Christ@gmail.com"
    },
    {
        name: 'Cris',
        email: "Cris@gmail.com"
    },
    {
        name: 'Nebula',
        email: "Nebula@gmail.com"
    },
    {
        name: 'Nony',
        email: "Nony@gmail.com"
    },
    {
        name: 'James',
        email: "James@gmail.com"
    },
    {
        name: 'Helio',
        email: "Helio@gmail.com"
    },
    {
        name: 'Angelina',
        email: "Angelina@gmail.com"
    },
    {
        name: 'Angular',
        email: "Angular@gmail.com"
    },
    {
        name: 'Angad',
        email: "Angad@gmail.com"
    },
];


function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
    console.log(suggestion)
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.name}</span>
    );
}


class AssignRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedName: '',
            value: '',
            email: '',
            suggestions: [],
            isUpdated: false,
            roleDetails: {
                name: '',
                email: '',
                role: '',
            },
            isSubmitted: false
        }
    }

    handleRoleChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        let temp = this.state.roleDetails;
        temp[id] = value;
        this.setState({
            roleDetails: temp
        })
    }

    handleSumbit = () => {
        this.setState({
            isSubmitted: !this.state.isSubmitted
        })
        this.props.AssignNewRole(this.state.roleDetails);
    }

    onChange = (event, { newValue, method }) => {
        console.log(event);
        this.setState({
            value: newValue
        });
        this.handleEmail(newValue);
    };

    handleEmail=(name) => {
       if(this.state.value){
           languages.map((data,i) => {
              if( data.name==name) {
              this.setState({
                  email: data.email
              })
              }
           })
       }
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Name Here",
            value,
            onChange: this.onChange
        };

        if (this.props.updatedDetails && !this.state.isUpdated) {
            console.log("updatedDetails", this.props.updatedDetails)
            this.setState({
                updatedName: this.props.updatedDetails.name,
                email: this.props.updatedDetails.email,
                roleDetails: this.props.updatedDetails,
                isUpdated: true
            })
        }
        
        return (
            <div>
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Name:-  </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        {/* <Input type="text" id="name" value={this.state.roleDetails.name} onChange={this.handleRoleChange} placeholder="Name" /> */}
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps} />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>

                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Email:- </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input disabled id="email" type="text" value={this.state.email ? this.state.email : "Email"} placeholder="Email" />
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>
                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="5" md="2" lg="2">
                        <Label> Role:- </Label>
                    </Col>
                    <Col xs="5" md="4" lg="4">
                        <Input id="role" type="select" value={this.state.roleDetails.role} onChange={this.handleRoleChange}>
                            <option value="Management">Management</option>
                            <option value="Internal Employee">Internal Employee</option>
                            <option value="External Employee">External Employee</option>
                            <option value="Designer">Designer</option>
                            <option value="Client">Client</option>
                        </Input>
                    </Col>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                </Row>

                <Row style={{ marginTop: 5 }}>
                    <Col xs="12" md="3" lg="3">
                    </Col>
                    <Col xs="12" md="6" lg="6">
                        <Button disabled={this.state.isSubmitted} color="success" style={{ float: "right" }} onClick={this.handleSumbit}>Assign</Button>
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
                                You Have Assigned New Role SuccessFully. Thanks !
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
        updatedDetails: state.roleDetail.updatedDetails
    };
}

function mapDispatchToProps(dispatch) {
    return {
        AssignNewRole: (data) => dispatch(AssignNewRole(data)),

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AssignRole);
