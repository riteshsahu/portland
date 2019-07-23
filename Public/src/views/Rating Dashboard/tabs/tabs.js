import React, { Component } from 'react';
import { Card, CardHeader, Row,Col,NavItem,NavLink,Nav,TabContent,TabPane } from 'reactstrap';
import ReviewSummary from '../review summary/reviewSummary';
import ReviewSource from '../review source/reviewSource';
import RecentReview from '../recent reviews/recentReviews';
import SentimentSummary from '../Sentiment Summary/sentimentSummary';
import RatingOvertime from '../Rating Over Time/ratingOverTime';

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: new Array(4).fill('1'),

        }
        this.toggle = this.toggle.bind(this);

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
              <Row>
            <Col xs="12" md="6" >
            <ReviewSummary/>
            </Col>
            <Col xs="12" md="6" >
            <ReviewSource/>
            </Col>
            </Row>
            <Row>
            <Col xs="12" md="12" ls="12" >
              <RecentReview/>
            </Col>
            </Row>
            <Row>
            <Col xs="12" md="6" >
            <RatingOvertime/>
            </Col>
            <Col xs="12" md="6" >
            <SentimentSummary/>
            </Col>
            </Row>
            </TabPane>

            <TabPane tabId="2">
             {null}
            </TabPane>
           
          </>
        );
      }
    render() {
        return (
            <Row>
            <Col xs="12" md="12" >
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === '1'}
                    onClick={() => { this.toggle(0, '1'); }}
                  >
                    DashBoard View
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === '2'}
                    onClick={() => { this.toggle(0, '2'); }}
                  >
                    Map View
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab[0]}>
                {this.tabPane()}
              </TabContent>
            </Col>
            </Row>
        )
    }
}
export default Tabs; 



