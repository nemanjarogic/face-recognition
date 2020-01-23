import { authenticationActionTypes } from "../actionTypes";
import { authenticationService } from "../../services";
import { alertActions } from ".";
import { history } from "../../helpers";

const login = (email, password) => {
  const loginRequest = user => {
    return { type: authenticationActionTypes.LOGIN_REQUEST, user };
  };
  const loginSuccess = user => {
    return { type: authenticationActionTypes.LOGIN_SUCCESS, user };
  };
  const loginFailure = error => {
    return { type: authenticationActionTypes.LOGIN_FAILURE, error };
  };

  return dispatch => {
    dispatch(loginRequest({ email }));

    authenticationService
      .login(email, password)
      .then(user => {
        dispatch(loginSuccess(user));
        history.push("/");
      })
      .catch(error => {
        dispatch(loginFailure(error.toString()));
        dispatch(alertActions.showErrorNotification(error.toString()));
      });
  };
};

const logout = () => {
  authenticationService.logout();
  return { type: authenticationActionTypes.LOGOUT };
};

const signUp = user => {
  const signUpRequest = user => {
    return { type: authenticationActionTypes.SIGN_UP_REQUEST, user };
  };
  const signUpSuccess = user => {
    return { type: authenticationActionTypes.SIGN_UP_SUCCESS, user };
  };
  const signUpFailure = error => {
    return { type: authenticationActionTypes.SIGN_UP_FAILURE, error };
  };

  return dispatch => {
    dispatch(signUpRequest(user));

    authenticationService
      .signUp(user)
      .then(user => {
        dispatch(signUpSuccess(user));
        history.push("/login");
        dispatch(
          alertActions.showSuccessNotification(
            "You have successfully signed up!"
          )
        );
      })
      .catch(error => {
        dispatch(signUpFailure(error.toString()));
        dispatch(alertActions.showErrorNotification(error.toString()));
      });
  };
};

export const authenticationActions = {
  login,
  logout,
  signUp
};
