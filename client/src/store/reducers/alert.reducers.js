import { alertActionTypes } from "../actionTypes";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case alertActionTypes.SHOW_SUCCESS_NOTIFICATION:
      return {
        type: "alert-success",
        message: action.message
      };
    case alertActionTypes.SHOW_ERROR_NOTIFICATION:
      return {
        type: "alert-danger",
        message: action.message
      };
    case alertActionTypes.CLEAR_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
};

export default reducer;
