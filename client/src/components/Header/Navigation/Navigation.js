import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Navigation = props => {
  return (
    <Navbar collapseOnSelect expand="sm" sticky="top">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="mr-auto">
        <Nav className="ml-auto">{props.children}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
