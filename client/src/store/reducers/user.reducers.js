import { userActionTypes } from "../actionTypes";

const initialState = {
  id: 0,
  submittedPhotos: 0,
  recognizedFaces: 0,
  isUpdateInProgress: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.LOAD_RECOGNITION_STATISTICS:
      return {
        ...state,
        id: action.user.id,
        submittedPhotos: action.user.submittedPhotos,
        recognizedFaces: action.user.recognizedFaces
      };
    case userActionTypes.UPDATE_RECOGNITION_STATISTICS:
      return {
        ...state,
        isUpdateInProgress: true
      };
    case userActionTypes.UPDATE_RECOGNITION_STATISTICS_SUCCESS:
      return {
        ...state,
        submittedPhotos: action.user.submittedPhotos,
        recognizedFaces: action.user.recognizedFaces,
        isUpdateInProgress: false
      };
    case userActionTypes.UPDATE_RECOGNITION_STATISTICS_FAILURE:
      return {
        ...state,
        isUpdateInProgress: false
      };
    default:
      return state;
  }
};

export default reducer;
