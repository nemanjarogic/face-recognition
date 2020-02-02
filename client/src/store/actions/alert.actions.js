import { alertActionTypes } from "../actionTypes";

const clearNotifications = () => {
  return { type: alertActionTypes.CLEAR_NOTIFICATIONS };
};

const showSuccessNotification = message => {
  const successRequest = () => {
    return { type: alertActionTypes.SHOW_SUCCESS_NOTIFICATION, message };
  };

  return dispatch => {
    dispatch(successRequest());
    setTimeout(() => {
      dispatch(clearNotifications());
    }, 5000);
  };
};

const showErrorNotification = message => {
  const errorRequest = () => {
    return { type: alertActionTypes.SHOW_ERROR_NOTIFICATION, message };
  };

  return dispatch => {
    dispatch(errorRequest());
    setTimeout(() => {
      dispatch(clearNotifications());
    }, 5000);
  };
};

export const alertActions = {
  showSuccessNotification,
  showErrorNotification,
  clearNotifications
};
