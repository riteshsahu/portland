import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container,Row,Alert } from 'reactstrap';
import { connect } from "react-redux";
import {getUserJobs,getUserCompletedJobs} from './action.defaultLayout';
import AppSlidebar from './AppSideBar';

import {
  AppAside,
  // AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  // AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  componentWillReceiveProps = (nextProps) => {
    // let arrRes = [] ;
    // nextProps.JobDetails && nextProps.JobDetails.map((data) => {
     
    // arrRes.push({
    //   id: data.jobId,
    //   name: data.jobTitle,
    //   url: "/activeJobs/"+data.jobId,
    //   icon: "fa fa-briefcase"
    // });
   
    // }) 
    // if(arrRes.length> 0){
    //   navigation.items[2]["children"]= arrRes;
    // }

    // let arrCompRes = [] ;
    // nextProps.DeletedJobDetails && nextProps.DeletedJobDetails.map((data) => {
    //   arrCompRes.push({
    //   id: data.jobId,
    //   name: data.jobTitle,
    //   url: "/archivedJobs/"+data.jobId,
    //   icon: "fa fa-briefcase"
    // });
   
    // }) 
    // if(arrCompRes.length> 0){
    //   navigation.items[3]["children"]= arrCompRes;
    // }
   
  }

  componentDidMount= () => {
    const userDetails = localStorage.getItem("userDetails");
    const user= JSON.parse(userDetails) ;
    this.props.getUserJobs(user[0].userId);
    this.props.getUserCompletedJobs(user[0].userId);
  }
  signOut(e) {
    e.preventDefault()
    localStorage.removeItem("userDetails");
    localStorage.removeItem("notifications");
    window.clientSocket.disconnect();
    delete window.clientSocket;
    this.props.history.push('/');
  }


  manageProfile(e) {
    this.props.history.push('/userProfile')
  }

  getNavigationForRoles(role, navigation) {
    let roleNavigation = {
      items: []
    }

    let users = navigation.items.find(item => { return (item.name === 'Users') });
    let jobs = navigation.items.find(item => { return (item.name === 'Jobs') });
    // let activeJobs = navigation.items.find(item => { return (item.name === 'Active Jobs')});
    // let archivedJobs = navigation.items.find(item => {return(item.name === 'Archived Jobs')});

    if (role === 1) { //  Admin
      roleNavigation.items.push(users);
      roleNavigation.items.push(jobs);
      // roleNavigation.items.push(activeJobs);
      // roleNavigation.items.push(archivedJobs);
    }
    if (role === 2) { // Management
      roleNavigation.items.push(users);
      roleNavigation.items.push(jobs);
      // roleNavigation.items.push(activeJobs);
      // roleNavigation.items.push(archivedJobs);
    }

    if (role === 3) { // Internal Employee 
      // roleNavigation.items.push(activeJobs);
      // roleNavigation.items.push(archivedJobs);
      // roleNavigation.items.push(gic);
    }

    if(role === 4) { // External employee
      // roleNavigation.items.push(activeJobs);
      // roleNavigation.items.push(archivedJobs);
    }

    if(role === 5) { // contractor
      // roleNavigation.items.push(activeJobs);
      // roleNavigation.items.push(archivedJobs);
    }

    if(role === 6) { // Client
      // roleNavigation.items.push(activeJobs);
      // roleNavigation.items.push(archivedJobs);
    }
    return roleNavigation;
  }
  
  render() {

    const userDetails = localStorage.getItem("userDetails");
    const user= JSON.parse(userDetails) ;
    let roleNavigation = this.getNavigationForRoles(user[0].role, navigation)
    return (
      
      <div className="app">
        <AppHeader fixed  >
          <Suspense fallback={this.loading()}>
            <DefaultHeader history={this.props.history} onLogout={e => this.signOut(e)} handleProfile ={e => this.manageProfile(e)} />
          </Suspense>
        </AppHeader>
        {this.props.errorFrom === "LAYOUT_USER_JOBS" ?
            <Row>
                <Alert color= "danger">{this.props.errorName}</Alert>
            </Row>
              : null }
        <div className="app-body">
          <AppSidebar fixed display="lg" style={{backgroundColor: "#1F4E3A",fontSize: "large"}}>
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSlidebar  navConfig={roleNavigation} {...this.props} />

            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            {/* <AppBreadcrumb appRoutes={routes} /> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/login" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorName: state.ProfileDetail.errorMessage.errorName,
    errorFrom: state.ProfileDetail.errorMessage.errorFrom
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserJobs: (id) => dispatch(getUserJobs(id)),
    getUserCompletedJobs: (id) => dispatch(getUserCompletedJobs(id))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);

