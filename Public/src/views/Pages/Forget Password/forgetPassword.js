import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import { forgotPassword } from '../Login/action.login';
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../Login/login.css';
import { Link } from 'react-router-dom';


class ForgetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            newPassword: "",
            confirmPassword: ""
        }
    }

    render() {
        return (
            <Formik
                initialValues={{
                    email: '',
                    newPassword: '',
                    confirmPassword: ""
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    newPassword: Yup.string()
                        .min(6, 'Confirm Password must be at least 6 characters')
                        .required('New Password is required'),
                    confirmPassword: Yup.string()
                        .min(6, 'Confirm Password must be at least 6 characters')
                        .required('Confirm Password is required')
                        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                })}
                onSubmit={fields => {
                    this.setState({
                        email: fields.email,
                        newPassword: fields.newPassword,
                    })
                    const NewData = {
                        email: this.state.email,
                        newPassword: this.state.newPassword,

                    }
                    this.props.forgotPassword(NewData);
                }}
                render={({ errors, status, touched }) => (
                    <div className="app flex-row align-items-center">
                        <Container>
                            <Row className="justify-content-center">
                                <Col md="12" >
                                    <CardGroup>
                                        <Col xs="12" lg="2" md="2">
                                        </Col>
                                        <Col xs="12" lg="4" md="4" style={{ padding: 0 }} >
                                            <Card className="p-4">
                                                <CardBody>
                                                    <Form>
                                                        <h1>Forgot Password</h1>
                                                        <InputGroup className="mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="icon-user"></i>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Field name="email" placeholder="Email" type="text"
                                                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                        </InputGroup>
                                                        <InputGroup className="mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="icon-lock"></i>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Field name="newPassword" placeholder="New Password" type="password"
                                                                className={'form-control' + (errors.newPassword && touched.newPassword ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="newPassword" component="div" className="invalid-feedback" /> <br />
                                                        </InputGroup>
                                                        <InputGroup className="mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="icon-lock"></i>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Field name="confirmPassword" placeholder="Confirm Password" type="password"
                                                                className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" /> <br />
                                                        </InputGroup>
                                                        <Row>
                                                            <span style={{ color: "red", marginLeft: 15 }} >{this.props.authError == true ? "Email Doesn't Exist" : null}</span>
                                                        </Row>
                                                        {this.props.passwordChanged ?
                                                            <Row>
                                                                <Col xs="12">
                                                                    <Alert color="success">Password Changed Successfully</Alert>
                                                                </Col>
                                                            </Row> : null}
                                                        {this.props.invalidEmail ?
                                                            <Row>
                                                                <Col xs="12">
                                                                    <Alert color="danger">Email Doesn't Exist</Alert>
                                                                </Col>
                                                            </Row> : null}
                                                        <Row>
                                                            <Col xs="12">
                                                                <Button type="submit" style={{ marginLeft: "30%" }} color="primary" className="px-4" >Submit</Button>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col xs="12" lg="4" md="4" style={{ padding: 0 }}>
                                            <Card className="text-white bg-primary py-5 " style={{ marginBottom: "0rem !important", height: 314, marginLeft: "-30" }}>
                                                <CardBody className="text-center">
                                                    <h2>Calm Down</h2>
                                                    <p>This Time get it tattoo so you will never forget it.</p>
                                                    <Link to="/register">
                                                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                                                    </Link> <br/>
                                                    <Link to="/">
                                                        <Button color="primary" className="mt-3" active tabIndex={-1}>Login</Button>
                                                    </Link>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col xs="12" lg="2" md="2">
                                        </Col>
                                    </CardGroup>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            />

        );
    }
}


const mapStateToProps = state => {
    return {
        invalidEmail: state.login.invalidEmail,
        passwordChanged: state.login.passwordChanged
    };
};
function mapDispatchToProps(dispatch) {
    return {
        forgotPassword: (value) => dispatch(forgotPassword(value))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
