import React, { Component } from 'react';
import { Button, Row, Col, Tabs, Tab, Navbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

export default class App extends Component {
  render() {
    return (
      <div>
          <Navbar collapseOnSelect bsStyle="inverse">
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to={"/"}>
                            <div>Credit Card Fraud Detection</div>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Nav>
                    <LinkContainer to="/">
                        <NavItem>Overview</NavItem>
                    </LinkContainer>
                     <LinkContainer to="/details">
                         <NavItem>Details</NavItem>
                    </LinkContainer>
                </Nav>
        </Navbar>
          {this.props.children}
      </div>
    );
  }
}
