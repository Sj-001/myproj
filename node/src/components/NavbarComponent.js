import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button, ToggleButton, Collapse } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.css'


class NavbarComponent extends Component {
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#">Ohlalaaaaaaaaa</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="./home">Home</Nav.Link>
      <Nav.Link href="./mine">Mine</Nav.Link>
      <Nav.Link href="./addTransaction">Add Transaction</Nav.Link>
      <Nav.Link href="./viewNetwork">View Network</Nav.Link>
      <Nav.Link href="./notifications">Notifications</Nav.Link>
      <Nav.Link href="./profile">Profile</Nav.Link>
    </Nav>
    <Nav style={{margin: '10px'}}>
      <i className="fa fa-search" style={{position: 'absolute'}} />
      <input type="text" placeholder="Search" style={{textAlign: 'center'}}/>
    </Nav>
    <Nav>
        <Button variant="outline-primary" className="text-center" style={{margin: '10px'}}>Sign up</Button>
        
        <Button variant="outline-primary" className="text-center" style={{margin: '10px'}}>Log In</Button>

    </Nav>
  </Navbar.Collapse>
</Navbar>
        
      </div>
    );
  }
}

export default NavbarComponent;