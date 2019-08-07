import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from "react-redux";
import {GetUserJobs} from './action.defaultLayout';
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
    let arrRes = [] ;
    nextProps.JobDetails && nextProps.JobDetails.map((data) => {
     
    arrRes.push({
      id: data.jobId,
      name: data.jobTitle,
      url: "/activeJobs/"+data.jobId,
      icon: "fa fa-user"
    });
   
    }) 
    if(arrRes.length> 0){
      navigation.items[2]["children"]= arrRes;
    }
   
  }

  componentDidMount= () => {
    const userDetails = localStorage.getItem("userDetails");
    const user= JSON.parse(userDetails) ;
    // console.log(user);
    this.props.GetUserJobs(user[0].userId);
  }
  signOut(e) {
    e.preventDefault()
    localStorage.removeItem("userDetails");
    this.props.history.push('/')
  }


  manageProfile(e) {
    this.props.history.push('/userProfile')
  }

  getNavigationForRoles(role, navigation) {
    let roleNavigation = {
      items: []
    }

    let user = navigation.items.find(item => { return (item.name === 'User') });
    let jobs = navigation.items.find(item => { return (item.name === 'Jobs') });
    let activeJobs = navigation.items.find(item => { return (item.name === 'Active Jobs') });

    if (role === 1) { //  Admin
      roleNavigation.items.push(user);
      roleNavigation.items.push(jobs);
      roleNavigation.items.push(activeJobs);
    }
    if (role === 2) { // Management
      roleNavigation.items.push(activeJobs);
    }

    if (role === 3) { // Internal Employee 
      roleNavigation.items.push(activeJobs);
      // roleNavigation.items.push(gic);
    }

    if(role === 4) { // External employee
      roleNavigation.items.push(activeJobs);
    }

    if(role === 5) { // contractor
      roleNavigation.items.push(activeJobs);
    }

    if(role === 6) { // Client
      roleNavigation.items.push(activeJobs);
    }

    return roleNavigation;
  }
  
  render() {

    const userDetails = localStorage.getItem("userDetails");
    const user= JSON.parse(userDetails) ;
  
    let roleNavigation = this.getNavigationForRoles(user[0].role, navigation)
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} handleProfile ={e => this.manageProfile(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSlidebar navConfig={roleNavigation} {...this.props} />

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
    JobDetails: state.LayoutDetail.JobDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    GetUserJobs: (id) => dispatch(GetUserJobs(id))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);

