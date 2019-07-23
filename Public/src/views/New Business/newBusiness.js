 
import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Label, Input, Badge, Button, CardFooter, Collapse, Fade, Row } from 'reactstrap';
import axios from 'axios';
import { URI, API_ROOT } from '../../config/config';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import NewBranch from './newBranch';
import { connect } from "react-redux";
import { handleCard } from './reducer/action.newBusiness';

class NewBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businessTitle: "",
            email: "",
            contactPerson: "",
            contactNo: "",
            website: "",
            aboutBusiness: "",
            Address1: "",
            Address2: "",
            city: "",
            zip: "",
            country: "",
            countryCode: "",
            state: "",
            stateCode: "",
            errors: [],
            countryData: "",
            myState: "",
            branchData: [],
            clickedToggle: ""
        }
    }

    componentDidMount = () => {
        axios.get(API_ROOT + URI.GET_COUNTRY).then(data => {
            this.setState({ countryData: data.data });
        }).catch(err => {
            console.log(err);
        })
    }

    handleBranch = () => {
        this.props.handleCard();
    }

    handleStateData = (e) => {
        let a = e.target.value;
        let selectedState = this.state.myState.find(item => {
            return (item.id == a)
        })
        this.setState({
            state: selectedState.id,
            stateCode: selectedState.name
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

    handleBranchData = (value) => {
        this.setState({
            branchData: value
        })
    }
   

    clickedBySumbit =() => {
        this.setState({
            clickedToggle: "CLICKED_BY_SUBMIT"
        })
    }
    render() {
       
        return (
            <Formik
                initialValues={{
                    businessTitle: '',
                    aboutBusiness: '',
                    contactPerson: '',
                    contactNo: '',
                    website: '',
                    email:'',
                    Address1: '',
                    Address2: '',
                    country: '',
                    state: '',
                    city: '',
                    zip: ''

                }}

                validationSchema={Yup.object().shape({
                    businessTitle: Yup.string()
                        .required('Business Title is required'),
                    aboutBusiness: Yup.string()
                        .required('About Business is required'),
                    contactPerson: Yup.string()
                        .required('Contact Person is required'),
                    contactNo: Yup.string()
                        .required('Contact Number is required'),
                    website: Yup.string()
                        .required('Website is required'),
                })}

                onSubmit={fields => {
                    if(this.state.clickedToggle=="CLICKED_BY_SUBMIT"){
                   
                    this.setState({
                        businessTitle: fields.businessTitle,
                        email: fields.email,
                        aboutBusiness: fields.aboutBusiness,
                        contactPerson: fields.contactPerson,
                        contactNo: fields.contactNo,
                        website: fields.website,
                        Address1: fields.Address1,
                        Address2: fields.Address2,
                        zip: fields.zip,
                        city: fields.city,
                        country: this.state.country,
                        countryCode: this.state.countryCode,
                        stateCode: this.state.stateCode,
                        state: this.state.state

                    })
                    let data = {
                        userId: 1,
                        businessId: 100+1,
                        title: this.state.businessTitle,
                        email:this.state.email,
                        contact_person: this.state.contactPerson,
                        contact_no: this.state.contactNo,
                        website: this.state.website,
                        about: this.state.aboutBusiness,
                        address1: this.state.Address1,
                        address2: this.state.Address2,
                        city: this.state.city,
                        state: this.state.state,
                        zip: this.state.zip,
                        country: this.state.country,
                        created_at: Date.now(),
                        updated_at: null,
                        created_by: 1,
                        updated_by: null,
                        isActive: 1
                    }
                    console.log("this state", this.state)

                    axios.post(API_ROOT + URI.ADD_NEWBUSINESS, data).then(data => {
                        console.log("data of BUSINESS FORM api", data)
                    }).catch(err => {
                        console.log(err);
                    })
                    if (this.state.branchData && this.state.branchData.length > 0) {
                        let branchData = {
                            branch: this.state.branchData,
                            userId: 1,
                            organizationId: 101,
                            created_at: Date.now(),
                            updated_at: null,
                            created_by: 1,
                            updated_by: null,
                            isActive: 1
                        }
                        axios.post(API_ROOT + URI.ADD_BRANCHES, branchData).then(data => {
                            console.log("data of BRANCH api", data)
                        }).catch(err => {
                            console.log(err);
                        })
                    }     
                }
                }}

                render={({ errors, status, touched }) => (
                    <Card>
                        <CardBody>
                            <Form>
                                <Row style={{ marginTop: "10px" }}>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Business Title:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="businessTitle" placeholder="Business Title "
                                            type="text" className={'form-control' + (errors.businessTitle && touched.businessTitle ? ' is-invalid' : '')} />
                                        <ErrorMessage name="businessTitle" component="div" className="invalid-feedback" />
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
                                            type="text" className={'form-control' + (errors.contactPerson && touched.contactPerson ? ' is-invalid' : '')} />
                                        <ErrorMessage name="contactPerson" component="div" className="invalid-feedback" />
                                    </Col>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Contact No.:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="contactNo" placeholder="Contact Number "
                                            type="number" className={'form-control' + (errors.contactNo && touched.contactNo ? ' is-invalid' : '')} />
                                        <ErrorMessage name="contactNo" component="div" className="invalid-feedback" />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "10px" }}>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Business website address:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="website" placeholder="Website "
                                            type="url" className={'form-control' + (errors.website && touched.website ? ' is-invalid' : '')} />
                                        <ErrorMessage name="website" component="div" className="invalid-feedback" />
                                    </Col>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>About You:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="aboutBusiness" placeholder="About Busineess "
                                            type="text" className={'form-control' + (errors.aboutBusiness && touched.aboutBusiness ? ' is-invalid' : '')} />
                                        <ErrorMessage name="aboutBusiness" component="div" className="invalid-feedback" />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "10px" }}>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Address 1</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="Address1" placeholder="Address "
                                            type="text" className='form-control' />
                                    </Col>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Address 2</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="Address2" placeholder="Address "
                                            type="text" className='form-control' />
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "10px" }}>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Country:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Input type="select" onClick={e => { this.province(e) }} >
                                            {this.handleCountry()}
                                        </Input>
                                    </Col>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>State:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Input type="select" onChange={this.handleStateData} >
                                            {this.handleState()}
                                        </Input>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "10px" }}>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>City:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="city" placeholder="City " type="text" className='form-control' />
                                    </Col>
                                    <Col xs="6" md="6" lg="2">
                                        <Label>Postal Code:</Label>
                                    </Col>
                                    <Col xs="6" md="6" lg="4">
                                        <Field name="zip" placeholder="Zip " type="text" className='form-control' />
                                    </Col>
                                </Row>

                                <Row style={{ marginLeft: "90%", marginTop: "10px", marginBottom: "10px" }}>
                                    <button type="button" className="btn btn-success " onClick={this.handleBranch} >
                                        Add Branch
                                    </button>
                                </Row>
                                <NewBranch saveBranchData={this.handleBranchData} />
                                <Row style={{ float: "right", marginTop: "10px", marginRight: "5px", marginBottom: "10px" }}>
                                    <button type="submit" className="btn btn-success" onClick={e=>{this.clickedBySumbit()}} >
                                        Submit
                                    </button>
                                </Row>
                            </Form>
                        </CardBody>
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
export default connect(mapStateToProps, mapDispatchToProps)(NewBusiness);
