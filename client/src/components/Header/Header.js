import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ onRouteChange, isUserSignedIn }) => {
  if (isUserSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="f3 link dim black pa3 pointer"
          onClick={() => onRouteChange("signout")}
        >
          {" "}
          Log Out{" "}
        </p>
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
