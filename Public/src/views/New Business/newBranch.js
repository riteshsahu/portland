import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Label, Input, Badge, Button, CardFooter, Collapse, Fade, Row } from 'reactstrap';
import axios from 'axios';
import { URI, API_ROOT } from '../../config/config';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { connect } from "react-redux";
import { handleCard } from './reducer/action.newBusiness';

class NewBranch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            branchData: [],
            contactNo: "",
            contactPerson: "",
            email: "",
            Address1: "",
            Address2: "",
            city: "",
            zip: "",
            countryData: "",
            myState: "",
            country: "",
            state: "",
            countryCode: "",
            stateCode: "",
            branchName: "",
            errors: [],
            cardToggle: false,
            accordion: [],
        }
        this.toggleAccordion = this.toggleAccordion.bind(this)
    }

    componentDidMount = () => {
        axios.get(API_ROOT + URI.GET_COUNTRY).then(data => {
            this.setState({ countryData: data.data });
        }).catch(err => {
            console.log(err);
        })
    }

    toggleAccordion(tab) {
        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => tab === index ? !x : false);
        this.setState({
            accordion: state,
        });
    }

    handleCountry = () => {
        if (this.state.countryData.length > 0) {
            var items = [];
            this.state.countryData.map((data, i) => {
                items.push(<option key={i} value={data.id}
                >{data.phoneCode}</option>);
            })
            return items;
        }
    }

    handleState = () => {
        if (this.state.myState.length > 0) {
            var items = [];
            this.state.myState.map((data, i) => {
                items.push(<option key={i} value={data.id}
                >{data.name}</option>);
            })
            return items;
        }
    }

    handleStateData = (e) => {
        let a = e.target.value;
        let selectedState = this.state.myState.find(item => {
            return (item.id == a)
        })
        this.setState({
            state: selectedState.name,
            stateCode: selectedState.id
        })
    }

    province = (e) => {
        let a = e.target.value;
        let selectedCountry = this.state.countryData.find(item => {
            return (item.id == a)
        })
        this.setState({
            country: selectedCountry.phoneCode,
            countryCode: selectedCountry.id
        })
        axios.get(API_ROOT + URI.GET_COUNTRY + "/" + a + "/" + URI.GET_STATES).then(data => {
            this.setState({ myState: data.data });
        }).catch(err => {
            console.log(err);
        })
    }

    handleCard = () => {
        console.log("state data", this.state);
        let result = [];
        if (this.state.branchData.length) {
            this.state.branchData.map((data, index) => {
                result.push(
                    <div id="accordion">
                        <Card className="mb-0">
                            <CardHeader id="headingOne">
                                <Row style={{ flexWrap: "inherit" }}>
                                    <Button block color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(index)} aria-expanded={this.state.accordion[index]} aria-controls="collapseOne">
                                        <h5 className="m-0 p-0">{data.branchName}</h5>
                                    </Button>
                                    <Badge>Device Id: {10000}</Badge>
                                </Row>
                            </CardHeader>
                            <Collapse isOpen={this.state.accordion[index]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                                <CardBody>
                                    <Row style={{ marginTop: "10px" }}>
                                        <Col xs="6" md="6" lg="2">
                                            <Label>Business Title:</Label>
                                        </Col>
                                        <Col xs="6" md="6" lg="4">
                                            <Input type="text" value={data.branchName} />
                                        </Col>
                                        <Col xs="6" md="6" lg="2">
                                            <Label>Email</Label>
                                        </Col>
                                        <Col xs="6" md="6" lg="4">
                                            <Input type="text" value={data.email} />
                                        </Col>
                                    </Row>

                                    <Row style={{ marginTop: "10px" }}>
                                        <Col xs="6" md="6" lg="2">
                                            <Label>Contact Person:</Label>
                                        </Col>
                                        <Col xs="6" md="6" lg="4">
                                            <Input type="text" value={data.contactPerson} />
                                        </Col>
                                        <Col xs="6" md="6" lg="2">
                                            <Label>Contact Number</Label>
                                        </Col>
                                        <Col xs="6" md="6" lg="4">
                                            <Input type="text" value={data.contactNo} />
                                        </Col>
                                    </Row>

                                    <Row style={{ marginTop: "10px" }}>
                                        <Col xs="6" md="6" lg="2">
                                            <Label>Address 1</Label>
                                        </Col>
                                        <Col xs="6" md="6" lg="4">
                                            <Input type="text" value={data.Address1} />
                                        </Col>
                                        <Col xs="6" md="6" lg="2">
                                            <Label>Address 2</Label>
                                        </Col>
                                        <Col xs="6" md="6" lg="4">
                                            <Input type="text" value={data.Address2} />
                                        </Col>
                                    </Row>

                                    <Row style={{ marginTop: "10px" }}>
                                        <Col xs="6" md="6" lg="2">
                                            <Label>Country:</Label>
                                        </Col>
                                        <Col xs="6" md="6" lg="4">
                                            <Input type="text" value={data.country} />
                                        </Col>
                                        <Col xs="6" md="6" lg="2">
                                            <Label>State:</Label>
                                        </Col>
                                        <Col xs="6" md="6" lg="4">
                                            <Input type="text" value={data.state} />
                                        </Col>
                                    </Row>

                                    <Row style={{ marginTop: "10px" }}>
                                        <Col xs="6" md="6" lg="2">
                                            <Label>City:</Label>
                                        </Col>
                                        <Col xs="6" md="6" lg="4">
                                            <Input type="text" value={data.city} />
                                        </Col>
                                        <Col xs="6" md="6" lg="2">
                                            <Label>Postal Code:</Label>
                                        </Col>
                                        <Col xs="6" md="6" lg="4">
                                            <Input type="Number" value={data.zip} />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Collapse>
                        </Card>
                    </div>
                );
            })
        }
        return result;
    }

    render() {
        return (
            <Formik
                initialValues={{
                    branchName: '',
                    email: '',
                    contactPerson: "",
                    contactNo: "",
                    Address1: "",
                    Address2: "",
                    city: "",
                    zip: "",
                    country: "",
                    state: "",


                }}

                validationSchema={Yup.object().shape({
                    branchName: Yup.string()
                        .required('Branch Name is required'),
                    Address1: Yup.string()
                        .required('Address  is required'),
                    Address2: Yup.string()
                        .required('Address is required'),
                    city: Yup.string()
                        .required('City is required'),

                })}
                enableReinitialize={true}
                onSubmit={(fields, { resetForm }) => {
                    console.log("country", this.state.country);
                    console.log("state", this.state.state);
                    console.log("fields", fields);
                    fields["country"] = this.state.country;
                    fields["state"] = this.state.state;
                    fields["countryCode"] = this.state.countryCode;
                    fields["stateCode"] = this.state.stateCode;
                    let value = this.state.branchData;
                    let accordionUpdate = [];
                    if (this.state.accordion.length > 0) {
                        this.state.accordion.map(dt => {
                            accordionUpdate.push(false);
                        })
                        accordionUpdate.push(true);
                    } else {
                        accordionUpdate.push(true);
                    }

                    value.push(fields)
                    this.setState({
                        branchData: value,
                        accordion: accordionUpdate
                    })
                    this.props.saveBranchData(value);
                    this.props.handleCard();
                    console.log("value", value);
                    resetForm({});
                }}

                render={({ errors, status, touched, values, handleChange }) => (
                    <Card className="mb-0">
                        {this.props.cardToggle && <CardHeader id="headingOne">
                            <Row style={{ flexWrap: "inherit" }}>
                                <h5 className="m-0 p-0">Branch Details </h5>
                            </Row>
                        </CardHeader>}
                        {this.props.cardToggle && <CardBody>
                            <Form>
                                <Row style={{ marginTop: "10px" }}>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Branch Name</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field type="text" name="branchName" placeholder="Branch Name"
                                            className={'form-control' + (errors.branchName && touched.branchName ? ' is-invalid' : '')} />
                                        <ErrorMessage name="branchName" component="div" className="invalid-feedback" />
                                    </Col>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Email</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="email" placeholder="Email "
                                            type="text" className='form-control' />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "10px" }}>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Contact Person:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="contactPerson" placeholder="Contact Person "
                                            type="text"  className='form-control'/>
                                    </Col>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Contact No.:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="contactNo" placeholder="Contact Number "
                                            type="number" className='form-control' />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "10px" }}>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Address 1</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="Address1" placeholder="Address "
                                            type="text" className={'form-control' + (errors.Address1 && touched.Address1 ? ' is-invalid' : '')} />
                                        <ErrorMessage name="Address1" component="div" className="invalid-feedback" />
                                    </Col>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Address 2</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="Address2" placeholder="Address "
                                            type="text" className={'form-control' + (errors.Address2 && touched.Address2 ? ' is-invalid' : '')} />
                                        <ErrorMessage name="Address2" component="div" className="invalid-feedback" />

                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "10px" }}>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Country:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Input type="select" onClick={e => { this.province(e) }}>
                                            {this.handleCountry()}
                                        </Input>
                                    </Col>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>State:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Input type="select" onChange={this.handleStateData}>
                                            {this.handleState()}
                                        </Input>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "10px" }}>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>City:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="city" placeholder="city "
                                            type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                        <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                    </Col>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Postal Code:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="zip" placeholder="Zip " type="text" className='form-control' />
                                    </Col>
                                </Row>

                                <Row style={{ float: "right", marginTop: "10px", marginBottom: "10px" }}>
                                    <Col>
                                        <button type="submit" className="btn btn-success"  >
                                            Save
                                        </button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>}
                        {this.state.branchData.length > 0 ? this.handleCard() : null}
                        {console.log("state me data", this.state)}
                    </Card>
                )}
            />
        )
    }
}


const mapStateToProps = state => {
    return {

        cardToggle: state.ToggleCard.cardToggle
    };
};
function mapDispatchToProps(dispatch) {

    return {
        handleCard: () => dispatch(handleCard())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewBranch);
