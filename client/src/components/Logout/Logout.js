import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { authenticationActions } from "../../store/actions";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticationActions.logout());
  }, [dispatch]);

  return <Redirect to="/" />;
};

export default Logout;
