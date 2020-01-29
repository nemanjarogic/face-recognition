import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";

import Navigation from "./Navigation/Navigation";
import "./Header.css";

const Header = () => {
  const isUserLoggedIn = useSelector(
    state =>
      state.authentication.user != null &&
      state.authentication.user.token != null
  );

  const userName = useSelector(state =>
    state.authentication.user != null ? state.authentication.user.name : ""
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
        <Button variant="transparent" as={Link} to="/">
          Home
        </Button>
        <DropdownButton variant="transparent" title={userName}>
          <Dropdown.Item as={Link} to="/profile">
            Your Profile
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/logout">
            Log Out
          </Dropdown.Item>
        </DropdownButton>
      </Navigation>
    );
  }

  return navigation;
};

export default Header;
