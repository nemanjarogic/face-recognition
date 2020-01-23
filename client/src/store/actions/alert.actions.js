import { alertActionTypes } from "../actionTypes";

const showSuccessNotification = message => {
  return { type: alertActionTypes.SHOW_SUCCESS_NOTIFICATION, message };
};

const showErrorNotification = message => {
  return { type: alertActionTypes.SHOW_ERROR_NOTIFICATION, message };
};

const clearNotifications = () => {
  return { type: alertActionTypes.CLEAR_NOTIFICATIONS };
};

export const alertActions = {
  showSuccessNotification,
  showErrorNotification,
  clearNotifications
};
