import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import Navigation from "./Navigation/Navigation";

import userIcon from "../../assets/images/user.png";
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

  let navigationItems = (
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
    const userDropdown = (
      <span>
        <img src={userIcon} className="user-icon" alt="User icon" />
        {userName}
      </span>
    );

    navigationItems = (
      <Navigation>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <NavDropdown title={userDropdown}>
          <NavDropdown.Item as={Link} to="/profile">
            Your Profile
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/logout">
            Log Out
          </NavDropdown.Item>
        </NavDropdown>
      </Navigation>
    );
  }

  return navigationItems;
};

export default Header;
