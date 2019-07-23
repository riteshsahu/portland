import  React , { Component } from 'react';
import {Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
import UserSupervisorList from './UserSupervisorList/UserSupervisorList';
import UserGroupList from './UserGroupList/UserGroupList';
import GroupAndRole  from './GroupAndRole/GroupAndRole';

class User extends Component{
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: new Array(4).fill('1'),
        };
      }


    lorem() {
        return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
      }
    
      toggle(tabPane, tab) {
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.setState({
          activeTab: newArray,
        });
      }
    tabPane() {
        return (
          <>
            <TabPane tabId="1">
              <UserSupervisorList />
            </TabPane>
            <TabPane tabId="2">
                <UserGroupList />
            </TabPane>
            <TabPane tabId="3">
                <GroupAndRole />
            </TabPane>
          </>
        );
      }

      
    render(){
        return(
            <Col xs="12" md="12" lg="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1'); }}
                >
                  User/Supervisor
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => { this.toggle(0, '2'); }}
                >
                  User/Group
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => { this.toggle(0, '3'); }}
                >
                  Group/Role
                </NavLink>
              </NavItem>             
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
        );
    }
}

export default User;