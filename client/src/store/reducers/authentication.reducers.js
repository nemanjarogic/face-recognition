import { authenticationActionTypes } from "../actionTypes";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { isUserLoggedIn: true, user } : {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case authenticationActionTypes.LOGIN_REQUEST:
      return {
        isLoggingInProgress: true,
        user: action.user
      };
    case authenticationActionTypes.LOGIN_SUCCESS:
      return {
        isUserLoggedIn: true,
        user: action.user
      };
    case authenticationActionTypes.LOGIN_FAILURE:
      return {};
    case authenticationActionTypes.LOGOUT:
      return {};
    case authenticationActionTypes.SIGN_UP_REQUEST:
      return { isSignUpInProgress: true };
    case authenticationActionTypes.SIGN_UP_SUCCESS:
      return {};
    case authenticationActionTypes.SIGN_UP_FAILURE:
      return {};
    default:
      return state;
  }
};

export default reducer;
