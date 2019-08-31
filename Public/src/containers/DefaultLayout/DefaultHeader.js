import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle,Button,  Input, InputGroup, InputGroupAddon, InputGroupText, Nav  } from 'reactstrap';
import PropTypes from 'prop-types';
import {  AppHeaderDropdown, AppSidebarToggler } from '@coreui/react';
import user from '../../assets/img/brand/user.png';
import './header.css';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

constructor(props){
  super(props);
  this.state={
      loginShow: false,
  }
}

  render() {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <h3 className="logo">Dashboard</h3>
        <AppSidebarToggler className="d-md-down-none" display="sm" />
        {/* <Nav className="d-md-down-none" navbar>
        User name
        </Nav> */}
        
        <Nav className="ml-auto"  style={{ marginTop: 10}} navbar>
          { this.state.loginShow ? 
        <div style={{ display: "contents"}}>
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-user"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" placeholder="Username" autoComplete="username" />
          </InputGroup>
          &nbsp;
          <InputGroup className="mb-3">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className="icon-lock"></i>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="password" placeholder="Password" autoComplete="current-password" />
          </InputGroup>
          &nbsp;
              
          <Button style= {{marginTop: -18}} color="primary" className= "" >Login</Button>
          &nbsp;
        </div> : 
        <AppHeaderDropdown direction="down" style={{display: 'contents'}}>
          <div> Welcome {userDetails[0].firstName}</div>
          <DropdownToggle nav>
            <img src={user} style={{marginBottom:20}} className="img-avatar" alt="admin@bootstrapmaster.com" />
          </DropdownToggle>
          <DropdownMenu right style={{ right: 'auto',marginTop: "-15px"}}>
            <DropdownItem onClick={e=> this.props.handleProfile(e)}><i className="fa fa-user"></i> Profile</DropdownItem>
            <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
          </DropdownMenu>
        </AppHeaderDropdown>
          }
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
