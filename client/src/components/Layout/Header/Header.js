import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const isUserLoggedIn = useSelector(
    state =>
      state.authentication.user != null &&
      state.authentication.user.token != null
  );

  if (isUserLoggedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <NavLink className="f3 link dim black pa3 pointer" to="/logout">
          Log Out
        </NavLink>
      </nav>
    );
  }

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
};

export default Header;
