import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/dashboard">Twilio Authentication</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {/* <Nav className="mx-auto">
          <Nav.Link href="/login">Login with Email</Nav.Link>
          <Nav.Link href="/login">Login with phone</Nav.Link>
        </Nav> */}

        {/* <Nav className="my-auto">
          <Nav.Link href="#logout">Logout</Nav.Link>
        </Nav> */}
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default NavBar