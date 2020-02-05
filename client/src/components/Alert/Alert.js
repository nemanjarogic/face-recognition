import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { history } from "../../helpers";
import { alertActions } from "../../store/actions";

import "./Alert.css";

const Alert = () => {
  const alertType = useSelector(state => state.alert.type);
  const alertMessage = useSelector(state => state.alert.message);

  const dispatch = useDispatch();
  const clearNotifications = () => dispatch(alertActions.clearNotifications());

  history.listen((location, action) => {
    // clear alert on location change
    clearNotifications();
  });

  let alert = null;
  if (alertMessage) {
    alert = (
      <div className="alert-box">
        <div className={`alert ${alertType}`}>{alertMessage}</div>
      </div>
    );
  }

  return alert;
};

export default Alert;
