import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Navigation from "./Navigation/Navigation";
import Nav from "react-bootstrap/Nav";
import "./Header.css";

const Header = () => {
  const isUserLoggedIn = useSelector(
    state =>
      state.authentication.user != null &&
      state.authentication.user.token != null
  );

  // Default Nav.Link usage (listed below) will refresh page
  // <Nav.Link href="/logout">Log Out</Nav.Link>
  // Use react-router-dom or react-router-bootstrap for handling SPA

  let navigation = (
    <Navigation>
      <Nav.Link as={Link} to="/login">
        Log In
      </Nav.Link>
      <Nav.Link as={Link} to="/signup">
        Sign Up
      </Nav.Link>
    </Navigation>
  );

  if (isUserLoggedIn) {
    return (
      <Navigation>
        <Nav.Link as={Link} to="/logout">
          Log Out
        </Nav.Link>
      </Navigation>
    );
  }

  return navigation;
};

export default Header;
