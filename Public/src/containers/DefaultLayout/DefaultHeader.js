import React, { Component } from 'react';
import {  NavLink } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle,Button,  Input, InputGroup, InputGroupAddon, InputGroupText, Nav, NavItem  } from 'reactstrap';
import PropTypes from 'prop-types';
import {  AppHeaderDropdown, AppSidebarToggler,AppBreadcrumb } from '@coreui/react';
import user from '../../assets/img/brand/user.png';
import './header.css';
import routes from '../../routes';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

constructor(props){
  super(props);
  this.state={
      loginShow: false
  }
}

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <h3 className="logo"> Admin-Console </h3>
        {/* <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        /> */}
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
          <AppBreadcrumb appRoutes={routes} />
            {/* <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink> */}
          </NavItem>
          {/* <NavItem className="px-3">
            <Link to="/users" className="nav-link">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem> */}
        </Nav>
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
                     <AppHeaderDropdown direction="down">
                     <DropdownToggle nav>
                       <img src={user} style={{marginBottom:20}} className="img-avatar" alt="admin@bootstrapmaster.com" />
                     </DropdownToggle>
                     <DropdownMenu right style={{ right: 'auto',marginTop: "-15px" }}>
                       <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                       <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
                     </DropdownMenu>
                   </AppHeaderDropdown>
          }
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
           */}
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
