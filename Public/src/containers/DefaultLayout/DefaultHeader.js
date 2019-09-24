import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle,Button,  Input, InputGroup, InputGroupAddon, InputGroupText, Nav,NavLink,NavItem  } from 'reactstrap';
import PropTypes from 'prop-types';
import {  AppHeaderDropdown, AppSidebarToggler } from '@coreui/react';
import user from '../../assets/img/brand/user.png';
import './header.css';
import { connect } from "react-redux";
import {SelectedJob} from '../../views/ActiveJobs/action.activeJobs';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

constructor(props){
  super(props);
  this.state={
      loginShow: false,
      stateJobDetails: [],
      searchData: '',
      jobFilterData:[]
  }
}
componentDidUpdate=() => {
  if(this.props.JobDetails !== this.state.stateJobDetails){
  this.setState({
    stateJobDetails: this.props.JobDetails
  })  
}

}
handleOnClick=(id,title) => {
  this.props.SelectedJob(id,title);
  this.props.history.push("/activeJobs/"+ id)
}
activeJobList=() => {
  let Result = [] ;
  if ( this.props.JobDetails && this.props.JobDetails.length>0  && !this.state.searchData) {
    this.props.JobDetails.map(data=> {
      Result.push (
        <DropdownItem  className= "item" onClick= {()=>this.handleOnClick(data.jobId,data.jobTitle)}>
        {data.jobTitle}
        </DropdownItem>
        );
    })
  }else 
  if(this.state.searchData){
    this.state.jobFilterData.map(data=> {
      Result.push (
        <DropdownItem  className= "item" onClick= {()=>this.handleOnClick(data.jobId,data.jobTitle)}>
        {data.jobTitle}
        </DropdownItem>
        );
    })
  }
  return Result;
}
handleDeletedJobs =(id,title) => {
  this.props.SelectedJob(id,title);
  this.props.history.push("/archivedJobs/"+ id)
}
deletedJobList=() => {
  let Result = [] ;
  if ( this.props.DeletedJobDetails && this.props.DeletedJobDetails.length>0 ) {
    this.props.DeletedJobDetails.map(data=> {
      Result.push (
        <DropdownItem  className= "item" onClick= {()=>this.handleDeletedJobs(data.jobId,data.jobTitle)}>
        {data.jobTitle}
        </DropdownItem>
        );
    })
  }
  return Result;
}

handleSearch=(e) => {
  this.setState({
    searchData: e.target.value
  })

  if (e.target.value) {
    let str= e.target.value.toString()
    let temp = this.state.stateJobDetails;
    let searchedArr = temp.filter(res=>{
      if(res.jobTitle.includes(str)){
        return true;
       }else{
         return false;
       }
    })
    
    this.setState({
      jobFilterData : searchedArr
    })
    }
}


  render() {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <h3 className="logo" style={{ color :"#1F4E3A"}}>Dashboard</h3>
        {/* <AppSidebarToggler className="d-md-down-none" display="lg" /> */}
        <AppSidebarToggler className="d-md-down-none dashboardIcon" display="lg"  />

        <Nav className="d-md-down-none" navbar>
          <AppHeaderDropdown direction="down">
          <DropdownToggle nav style={{marginRight: 20, marginLeft: 20}}>
          <NavItem className="px-3">
            <NavLink className="nav-link font" >Active Jobs</NavLink>
          </NavItem>
          </DropdownToggle>
        <DropdownMenu className= "activeJobList" >
        <DropdownItem onClick="disabled"><Input type="text" placeholder="Search" onChange={(e)=> this.handleSearch(e)}/></DropdownItem>
          {this.activeJobList()}
          </DropdownMenu>
          </AppHeaderDropdown>
          <AppHeaderDropdown direction="down">
          <DropdownToggle nav style={{marginRight: 20}}>
          <NavItem className="px-3">
            <NavLink className="nav-link font">Archived Jobs</NavLink>
          </NavItem>
          </DropdownToggle>
        <DropdownMenu className= "activeJobList" >
        {this.deletedJobList()} 
          </DropdownMenu>
          </AppHeaderDropdown>
          </Nav>
        {/* <Nav className="d-md-down-none" navbar>
        User name
        </Nav>
         */}
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
          <div style={{marginBottom: "15px",color: "cornflowerblue",fontWeight: "bold"}}> {userDetails[0].firstName}</div>
          <DropdownToggle nav style={{marginRight: 20}}>
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



const mapStateToProps = state => {
  return {
    JobDetails: state.LayoutDetail.JobDetails,
    DeletedJobDetails: state.LayoutDetail.DeletedJobDetails,

  };
}

function mapDispatchToProps(dispatch) {
  return {
    SelectedJob:(id,name)=> dispatch(SelectedJob(id,name))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DefaultHeader);