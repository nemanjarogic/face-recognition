import { userActionTypes } from "../actionTypes";
import { userService } from "../../services";
import { alertActions } from ".";

const fetchRecognitionStatistics = user => {
  return dispatch => {
    userService
      .fetchRecognitionStatistics(user)
      .then(user => {
        dispatch(loadInitialRecognitionStatistics(user));
      })
      .catch(error => {
        dispatch(alertActions.showErrorNotification(error.toString()));
      });
  };
};

const loadInitialRecognitionStatistics = user => {
  return { type: userActionTypes.LOAD_RECOGNITION_STATISTICS, user };
};

const updateRecognitionStatistics = user => {
  const updateRequest = user => {
    return {
      type: userActionTypes.UPDATE_RECOGNITION_STATISTICS,
      user
    };
  };
  const updateSuccess = user => {
    return {
      type: userActionTypes.UPDATE_RECOGNITION_STATISTICS_SUCCESS,
      user
    };
  };
  const updateFailure = error => {
    return {
      type: userActionTypes.UPDATE_RECOGNITION_STATISTICS_FAILURE,
      error
    };
  };

  return dispatch => {
    dispatch(updateRequest(user));

    userService
      .updateRecognitionStatistics(user)
      .then(user => {
        dispatch(updateSuccess(user));
        dispatch(
          alertActions.showSuccessNotification(
            "Recognition statistics is updated."
          )
        );
      })
      .catch(error => {
        dispatch(updateFailure(error.toString()));
        dispatch(alertActions.showErrorNotification(error.toString()));
      });
  };
};

export const userActions = {
  fetchRecognitionStatistics,
  updateRecognitionStatistics
};
