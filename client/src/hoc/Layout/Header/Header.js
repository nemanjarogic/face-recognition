import React from "react";
import { useSelector } from "react-redux";

import Navigation from "./Navigation/Navigation";
import Nav from "react-bootstrap/Nav";
import "./Header.css";

const Header = () => {
  const isUserLoggedIn = useSelector(
    state =>
      state.authentication.user != null &&
      state.authentication.user.token != null
  );

  if (isUserLoggedIn) {
    return (
      <Navigation>
        <Nav.Link href="/logout">Log Out</Nav.Link>
      </Navigation>
    );
  }

  return (
    <Navigation>
      <Nav.Link href="/login">Log In</Nav.Link>
      <Nav.Link href="/signup">Sign Up</Nav.Link>
    </Navigation>
  );
};

export default Header;
