import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ isUserSignedIn }) => {
  if (isUserSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <NavLink className="f3 link dim black pa3 pointer" to="/logout">
          Log Out
        </NavLink>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <NavLink className="f3 link dim black pa3 pointer" to="/login">
          Log In
        </NavLink>
        <NavLink className="f3 link dim black pa3 pointer" to="/signup">
          Sign Up
        </NavLink>
      </nav>
    );
  }
};

export default Header;
