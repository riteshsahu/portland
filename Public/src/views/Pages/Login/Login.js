import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { login } from './action.login';
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getAccess: false,
      email: "",
      password: ""
    }
  }
 
  userDetails = () => {
    this.setState({
      getAccess: true
    })
  }

  handleForgetPassword = () => {
    this.props.history.push('/forgetPassword')
  }

  render() {
    const userDetils = JSON.parse(localStorage.getItem('userDetails'));

    if (userDetils) {
      return <Redirect push to='/userProfile' />
    }
    if (this.state.getAccess) {
      return <Redirect push to='/userDetail' />
    }

    return (

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({

          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        })}
        onSubmit={fields => {
          this.setState({
            email: fields.email,
            password: fields.password,
          })
          const loginData = {
            email: this.state.email,
            password: this.state.password
          }
          this.props.login(loginData);
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
                            <h1>Login</h1>
                            <p className="text-muted">Sign In to your account</p>
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
                              <Field name="password" placeholder="Password" type="password"
                                className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                              <ErrorMessage name="password" component="div" className="invalid-feedback" /> <br />

                            </InputGroup>
                            <Row>
                              <span style={{ color: "red", marginLeft: 15 }} >{this.props.authError  ? this.props.authError : null}</span>
                            </Row>
                            <Row>
                              <Col xs="6">
                                <Button type="submit" color="primary" className="px-4" onClick={this.handleLogin} >Login</Button>
                              </Col>
                              <Col xs="6" className="text-right">
                                <Button style={{ fontSize: "smaller" }} onClick={() => this.handleForgetPassword()} color="link" className="px-0">Forgot password?</Button>
                              </Col>
                            </Row>
                          </Form>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xs="12" lg="4" md="4" style={{ padding: 0 }}>
                      <Card className="text-white bg-primary py-5 " style={{ marginBottom: "0rem !important", height: 314, marginLeft: "-30" }}>
                        <CardBody className="text-center">
                          <h2>Sign up</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                          <Link to="/register">
                            <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
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
    userDetail: state.login.userDetail,
    authError: state.login.authError

  };
};
function mapDispatchToProps(dispatch) {

  return {
    login: (value) => dispatch(login(value))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
