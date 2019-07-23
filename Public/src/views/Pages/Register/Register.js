// import React, { Component } from 'react';
// import { connect } from "react-redux";
// import { Button,Alert, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
// import { saveRegistrationDetails,userCreateFalse } from './action.register';
// import {Link} from 'react-router-dom';
// import { Formik } from 'formik';

// class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       email: "",
//       password: "",
//       RepeatPassword: "",
//       errors: []
//     }
//   }


//   handleFullName = (e) => {
//     this.setState({
//       name: e.target.value
//     })
//   }

//   handleEmail = (e) => {
//     this.setState({
//       email: e.target.value
//     })
//   }

//   handlePassword = (e) => {
//     this.setState({
//       password: e.target.value
//     })
//   }

//   handleRepeatPassword = (e) => {
//     this.setState({
//       RepeatPassword: e.target.value
//     })
//   }

//   submitRegistrationDetails = () => {
//     if(this.state.name && this.state.email  && this.state.password && this.state.password==this.state.RepeatPassword){
//     const userData = {
//       name: this.state.name,
//       email: this.state.email,
//       password: this.state.password,
//       role: 1,
//       isApproved: 0,
//       isProfileUpdated: 0,
//       createdBy: this.state.email
//     };
//     console.log(userData)
//     // this.props.saveRegistrationDetails(userData);
//   }
//   else{
//     if (!this.state.name){
//       let error=this.state.errors;
//       error["name"]= "Name Is Required"
//       this.setState({
//         errors: error
//       })
//     }
//     if (!this.state.email){
//       let error=this.state.errors;
//       error["email"]= "Email Is Required"
//       this.setState({
//         errors: error
//       })
//     }
//     if (!this.state.password){
//       let error=this.state.errors;
//       error["password"]= "Password Is Required"
//       this.setState({
//         errors: error
//       })
//     }
//     if (this.state.password!= this.state.RepeatPassword){
//       let error=this.state.errors;
//       error["unmatched"]= "Password Didn't matched"
//       this.setState({
//         errors: error
//       })
//     }
//   }
//   }


//   render() {
//     console.log("data of state", this.state)
//     return (
//       <div>
//         { this.props.userRegistered &&
//           <div>
//           <Alert color="success">
//                   Your Registration Is Successfull...
//                 </Alert>
//           </div>
//          }

//       <div className="app flex-row align-items-center">
//         <Container>
//           <Row className="justify-content-center">
//             <Col md="9" lg="7" xl="6">
//               <Card className="mx-4">
//                 <CardBody className="p-4">
//                   <Form onSubmit={this.submitRegistrationDetails}>
//                     <h1>Register</h1>
//                     <p className="text-muted">Create your account</p>
//                     <InputGroup className="mb-3">
//                       <InputGroupAddon addonType="prepend">
//                         <InputGroupText>
//                           <i className="icon-user"></i>
//                         </InputGroupText>
//                       </InputGroupAddon>
//                       <Input type="text"  placeholder="Full-Name" autoComplete="Full-Name" onChange={this.handleFullName} />
//                       <span style={{ marginLeft: 50, color: "red" }}>{this.state.errors["name"]}</span>
//                     </InputGroup>
//                     <InputGroup className="mb-3">
//                       <InputGroupAddon addonType="prepend">
//                         <InputGroupText>@</InputGroupText>
//                       </InputGroupAddon>
//                       <Input type="email" style={{ width: "90%" }} required placeholder="Email" autoComplete="email" onChange={this.handleEmail} /><br />
//                       <span style={{ marginLeft: 50, color: "red" }}>{this.state.errors["email"]}</span>
//                       <span style={{ marginLeft: 50, color: "red" }} >{this.props.error ? "Email already exists" : null}</span>
//                     </InputGroup>
//                     <InputGroup className="mb-3">
//                       <InputGroupAddon addonType="prepend">
//                         <InputGroupText>
//                           <i className="icon-lock"></i>
//                         </InputGroupText>
//                       </InputGroupAddon>
//                       <Input type="password" placeholder="Password" autoComplete="new-password" onChange={this.handlePassword} />
//                       <span style={{ marginLeft: 50, color: "red" }}>{this.state.errors["password"]}</span>
//                     </InputGroup>
//                     <InputGroup className="mb-4">
//                       <InputGroupAddon addonType="prepend">
//                         <InputGroupText>
//                           <i className="icon-lock"></i>
//                         </InputGroupText>
//                       </InputGroupAddon>
//                       <Input type="password" placeholder="Repeat password" autoComplete="new-password" onChange={this.handleRepeatPassword} />
//                       <span style={{ marginLeft: 50, color: "red" }}>{this.state.errors["unmatched"]}</span>
//                     </InputGroup>
//                     <Button color="success" block  disabled={this.props.userRegistered} >Create Account</Button>
//                   </Form>
//                 </CardBody>
//                 <CardFooter className="p-4">
//                   <Row style={{marginLeft: "45%"}}>
//                     {/* <Col xs="12" sm="6">
//                       <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
//                     </Col>
//                     <Col xs="12" sm="6">
//                       <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
//                     </Col> */}
//                     <Link to="/#/login">
//                       <Button color="success" onClick={e=> { this.props.userCreateFalse()}} >Login</Button>
//                     </Link>

//                   </Row>
//                 </CardFooter>
//               </Card>
//             </Col>
//           </Row>
//           <Row>

//           </Row>
//         </Container>

//       </div>
//       </div>
//     );
//   }
// }


// const mapStateToProps = state => {
//   return {
//     error: state.register.error,
//     userRegistered: state.register.userRegistered
//   };
// };
// function mapDispatchToProps(dispatch) {

//   return {
//     saveRegistrationDetails: (value) => dispatch(saveRegistrationDetails(value)),
//     userCreateFalse: ()=> dispatch(userCreateFalse())
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Register);



import React from 'react';
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Alert, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { saveRegistrationDetails, userCreateFalse } from './action.register';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      RepeatPassword: "",
      errors: []
    }
  }
  submitRegistrationDetails = () => {
    if (this.state.name && this.state.email && this.state.password && this.state.password == this.state.RepeatPassword) {
      const userData = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        role: 1,
        isApproved: 0,
        isProfileUpdated: 0,
        createdBy: this.state.email
      };
      console.log(userData)
      this.props.saveRegistrationDetails(userData);
    }
  }


  render() {
    return (
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
          fullName: Yup.string()
            .required('Full Name is required'),
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
        })}
        onSubmit={fields => {
          this.setState({
            name: fields.fullName,
            email: fields.email,
            password: fields.password,
            RepeatPassword: fields.confirmPassword
          })
          const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: 1,
            isApproved: 0,
            isProfileUpdated: 0,
            createdBy: this.state.email
          };
          console.log(userData)
          this.props.saveRegistrationDetails(userData);
        }}

        render={({ errors, status, touched }) => (
         
          <div className="app flex-row align-items-center">
             
            <Container>
          <Row style={{marginLeft: "40%"}}>
          {this.props.userRegistered && 
            <div>
              <Alert style={{ background:"#4dbd74",color:"white"}}>
                Your Registration Is Successfull...
               </Alert>
            </div>
          }
          </Row>
              <Row className="justify-content-center">
                <Col md="9" lg="7" xl="6">
                  <Card className="mx-4">
                    <CardBody className="p-4">
                      <Form>
                        <h1>Register</h1>
                        <p className="text-muted">Create your account</p>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field name="fullName" placeholder="Full Name"
                            type="text" className={'form-control' + (errors.fullName && touched.fullName ? ' is-invalid' : '')} />
                          <ErrorMessage name="fullName" component="div" className="invalid-feedback" />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>@</InputGroupText>
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
                          <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Field name="confirmPassword" placeholder="Confirm Password" type="password"
                            className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                          <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </InputGroup>
                        <InputGroup>
                          <button style={{ width: "100%" }} type="submit" disabled={this.props.userRegistered} class="btn btn-success">Create Account</button>
                        </InputGroup>
                      </Form>
                    </CardBody>

                    <CardFooter className="p-4">
                      <Row style={{ marginLeft: "45%" }}>
                        <Link to="/#/login">
                          <Button color="success" onClick={e => { this.props.userCreateFalse() }} >Login</Button>
                        </Link>
                      </Row>
                    </CardFooter>

                  </Card>
                </Col>
              </Row>
            </Container>
          </div>)}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    userRegistered: state.register.userRegistered
  };
};
function mapDispatchToProps(dispatch) {
  return {
    saveRegistrationDetails: (value) => dispatch(saveRegistrationDetails(value)),
    userCreateFalse: () => dispatch(userCreateFalse())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register);
